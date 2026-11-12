const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// 部屋の状態を保持するオブジェクト
const rooms = {};

// 4桁のランダムなルームIDを生成
function generateRoomId() {
    let id;
    do {
        id = Math.floor(1000 + Math.random() * 9000).toString();
    } while (rooms[id]);
    return id;
}

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // 部屋の作成
    socket.on('createRoom', ({ playerName }) => {
        const roomId = generateRoomId();
        rooms[roomId] = {
            id: roomId,
            hostId: socket.id,
            status: 'waiting', // waiting, playing, finished
            settings: {
                maxHp: 30,
                timeLimit: 60, // 秒 (最大300秒 = 5分)
                difficulty: 'medium'
            },
            players: {},
            timer: null,
            remainingTime: 60
        };

        rooms[roomId].players[socket.id] = {
            id: socket.id,
            name: playerName || 'プレイヤー1',
            hp: 30,
            maxHp: 30,
            score: 0,
            missCount: 0,
            isDead: false,
            reviveClicks: 0,
            currentWordIndex: 0
        };

        socket.join(roomId);
        socket.roomId = roomId;
        socket.emit('roomJoined', { roomId, isHost: true, room: rooms[roomId] });
    });

    // 部屋への参加
    socket.on('joinRoom', ({ roomId, playerName }) => {
        const room = rooms[roomId];
        if (!room) {
            return socket.emit('errorMsg', '指定された部屋が見つかりません。');
        }
        if (room.status !== 'waiting') {
            return socket.emit('errorMsg', 'この部屋はすでに試合が始まっています。');
        }
        if (Object.keys(room.players).length >= 2) {
            return socket.emit('errorMsg', 'この部屋は満員です（2人対戦専用）。');
        }

        room.players[socket.id] = {
            id: socket.id,
            name: playerName || 'プレイヤー2',
            hp: room.settings.maxHp,
            maxHp: room.settings.maxHp,
            score: 0,
            missCount: 0,
            isDead: false,
            reviveClicks: 0,
            currentWordIndex: 0
        };

        socket.join(roomId);
        socket.roomId = roomId;
        socket.emit('roomJoined', { roomId, isHost: false, room });
        io.to(roomId).emit('updateRoom', room);
    });

    // ホストによるルール設定変更
    socket.on('updateSettings', ({ settings }) => {
        const room = rooms[socket.roomId];
        if (!room || room.hostId !== socket.id || room.status !== 'waiting') return;

        room.settings = {
            maxHp: Math.max(5, Math.min(200, Number(settings.maxHp) || 30)),
            timeLimit: Math.max(30, Math.min(300, Number(settings.timeLimit) || 60)),
            difficulty: ['easy', 'medium', 'hard', 'goat'].includes(settings.difficulty) ? settings.difficulty : 'medium'
        };

        // 全プレイヤーの初期HPを同期
        Object.values(room.players).forEach(p => {
            p.hp = room.settings.maxHp;
            p.maxHp = room.settings.maxHp;
        });

        io.to(room.id).emit('updateRoom', room);
    });

    // ゲーム開始（ホストのみ実行可能）
    socket.on('startGame', ({ wordIndices }) => {
        const room = rooms[socket.roomId];
        if (!room || room.hostId !== socket.id) return;
        if (Object.keys(room.players).length < 2) {
            return socket.emit('errorMsg', '対戦相手が揃うまで開始できません。');
        }

        room.status = 'playing';
        room.remainingTime = room.settings.timeLimit;
        room.wordIndices = wordIndices; // クライアント側でシャッフルした問題順を共有

        Object.values(room.players).forEach(p => {
            p.hp = room.settings.maxHp;
            p.maxHp = room.settings.maxHp;
            p.score = 0;
            p.missCount = 0;
            p.isDead = false;
            p.reviveClicks = 0;
            p.currentWordIndex = 0;
        });

        io.to(room.id).emit('gameStarted', room);

        // カウントダウンタイマー開始
        if (room.timer) clearInterval(room.timer);
        room.timer = setInterval(() => {
            room.remainingTime--;
            io.to(room.id).emit('timerTick', room.remainingTime);

            if (room.remainingTime <= 0) {
                endGame(room.id, 'timeup');
            }
        }, 1000);
    });

    // タイプミス時のHP減少処理
    socket.on('playerMiss', () => {
        const room = rooms[socket.roomId];
        if (!room || room.status !== 'playing') return;
        const player = room.players[socket.id];
        if (!player || player.isDead) return;

        player.missCount++;
        player.hp = Math.max(0, player.hp - 1);

        if (player.hp === 0) {
            player.isDead = true;
            player.reviveClicks = 0;
        }

        io.to(room.id).emit('updatePlayers', room.players);
    });

    // 単語クリア時のスコア加算＆相手への攻撃（または次の単語へ）
    socket.on('wordCompleted', ({ damage }) => {
        const room = rooms[socket.roomId];
        if (!room || room.status !== 'playing') return;
        const player = room.players[socket.id];
        if (!player || player.isDead) return;

        player.score += 100;
        player.currentWordIndex++;

        // 相手プレイヤーにもダメージを与える（1単語クリアにつき1ダメージ）
        const opponent = Object.values(room.players).find(p => p.id !== socket.id);
        if (opponent && !opponent.isDead) {
            opponent.hp = Math.max(0, opponent.hp - (damage || 1));
            if (opponent.hp === 0) {
                opponent.isDead = true;
                opponent.reviveClicks = 0;
            }
        }

        io.to(room.id).emit('updatePlayers', room.players);
        io.to(room.id).emit('attackEffect', { attackerId: socket.id });
    });

    // 復活ボタン連打処理（30回でHP5回復）
    socket.on('reviveClick', () => {
        const room = rooms[socket.roomId];
        if (!room || room.status !== 'playing') return;
        const player = room.players[socket.id];
        if (!player || !player.isDead) return;

        player.reviveClicks++;
        if (player.reviveClicks >= 30) {
            player.isDead = false;
            player.reviveClicks = 0;
            player.hp = Math.min(player.maxHp, 5); // HPを5回復して復活
        }

        io.to(room.id).emit('updatePlayers', room.players);
    });

    // ロビーに戻る
    socket.on('returnToLobby', () => {
        const room = rooms[socket.roomId];
        if (!room) return;
        room.status = 'waiting';
        if (room.timer) clearInterval(room.timer);
        io.to(room.id).emit('updateRoom', room);
    });

    // 切断処理
    socket.on('disconnect', () => {
        const roomId = socket.roomId;
        const room = rooms[roomId];
        if (room) {
            if (room.timer) clearInterval(room.timer);
            delete room.players[socket.id];
            if (Object.keys(room.players).length === 0) {
                delete rooms[roomId];
            } else {
                // ホストが抜けたら残った人をホストにする
                if (room.hostId === socket.id) {
                    room.hostId = Object.keys(room.players)[0];
                }
                room.status = 'waiting';
                io.to(roomId).emit('opponentLeft', room);
            }
        }
    });
});

function endGame(roomId, reason) {
    const room = rooms[roomId];
    if (!room) return;
    if (room.timer) clearInterval(room.timer);
    room.status = 'finished';

    const players = Object.values(room.players);
    let winnerId = null;

    if (players.length === 2) {
        const [p1, p2] = players;
        // 生存優先 -> 残りHP優先 -> スコア優先
        if (!p1.isDead && p2.isDead) winnerId = p1.id;
        else if (p1.isDead && !p2.isDead) winnerId = p2.id;
        else if (p1.hp !== p2.hp) winnerId = p1.hp > p2.hp ? p1.id : p2.id;
        else if (p1.score !== p2.score) winnerId = p1.score > p2.score ? p1.id : p2.id;
    }

    io.to(roomId).emit('gameEnded', { reason, winnerId, players: room.players });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`ポート ${PORT} で起動中`));