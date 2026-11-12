const socket = io();

// 状態変数
let myId = null;
let isHost = false;
let currentRoom = null;
let typingEngine = null;
let activeWordList = [];
let wordOrder = [];
let currentWordPos = 0;

// DOM要素の取得
const screens = {
    home: document.getElementById('screen-home'),
    lobby: document.getElementById('screen-lobby'),
    battle: document.getElementById('screen-battle'),
    result: document.getElementById('screen-result')
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// 難易度に応じた問題リスト取得（MIXは全難易度を結合）
function getWordListByDifficulty(diff) {
    if (diff === 'mix') {
        return [
            ...wordLists.easy,
            ...wordLists.medium,
            ...wordLists.hard,
            ...wordLists.goat
        ];
    }
    return wordLists[diff] || wordLists.medium;
}

// ==========================================
// 1. ホーム画面＆部屋退出イベント
// ==========================================
document.getElementById('btn-create-room').addEventListener('click', () => {
    const playerName = document.getElementById('player-name-input').value.trim() || 'プレイヤー1';
    socket.emit('createRoom', { playerName });
});

document.getElementById('btn-join-room').addEventListener('click', () => {
    const playerName = document.getElementById('player-name-input').value.trim() || 'プレイヤー2';
    const roomId = document.getElementById('room-id-input').value.trim();
    if (roomId.length !== 4) {
        document.getElementById('home-error').textContent = '4桁のルームIDを入力してください。';
        return;
    }
    socket.emit('joinRoom', { roomId, playerName });
});

socket.on('errorMsg', (msg) => {
    document.getElementById('home-error').textContent = msg;
});

// 部屋から退出してトップ画面に戻る処理
function leaveCurrentRoom() {
    if (currentRoom && currentRoom.status === 'playing') {
        if (!confirm('試合中です。本当に部屋から退出しますか？')) return;
    }
    socket.emit('leaveRoom');
}

document.getElementById('btn-header-leave').addEventListener('click', leaveCurrentRoom);
document.getElementById('btn-lobby-leave').addEventListener('click', leaveCurrentRoom);
document.getElementById('btn-result-leave').addEventListener('click', leaveCurrentRoom);

socket.on('leftRoom', () => {
    currentRoom = null;
    isHost = false;
    document.getElementById('room-badge').classList.add('hidden');
    document.getElementById('btn-header-leave').classList.add('hidden');
    document.getElementById('revive-overlay').classList.add('hidden');
    document.getElementById('home-error').textContent = '';
    showScreen('home');
});

// ==========================================
// 2. ロビー画面＆ホスト設定の同期
// ==========================================
socket.on('roomJoined', ({ roomId, isHost: hostFlag, room }) => {
    myId = socket.id;
    isHost = hostFlag;
    currentRoom = room;

    document.getElementById('home-error').textContent = '';
    document.getElementById('room-badge').classList.remove('hidden');
    document.getElementById('btn-header-leave').classList.remove('hidden');
    document.getElementById('header-room-id').textContent = roomId;
    document.getElementById('lobby-room-id').textContent = roomId;

    updateLobbyUI(room);
    showScreen('lobby');
});

socket.on('updateRoom', (room) => {
    currentRoom = room;
    if (room.status === 'waiting') {
        updateLobbyUI(room);
        showScreen('lobby');
    }
});

socket.on('opponentLeft', (room) => {
    currentRoom = room;
    isHost = (room.hostId === myId);
    document.getElementById('revive-overlay').classList.add('hidden');
    alert('対戦相手が退出しました。ロビーに戻ります。');
    updateLobbyUI(room);
    showScreen('lobby');
});

function updateLobbyUI(room) {
    isHost = (room.hostId === myId);
    const players = Object.values(room.players);
    const hostPlayer = players.find(p => p.id === room.hostId);
    const guestPlayer = players.find(p => p.id !== room.hostId);

    document.getElementById('lobby-p1-name').textContent = hostPlayer ? hostPlayer.name : '待機中...';
    document.getElementById('lobby-p2-name').textContent = guestPlayer ? guestPlayer.name : '待機中...';

    // スライダー・攻撃トグル・難易度ボタンの値反映
    const sliderHp = document.getElementById('slider-hp');
    const sliderTime = document.getElementById('slider-time');
    const toggleAttack = document.getElementById('toggle-attack');
    const diffBtns = document.querySelectorAll('.diff-btn');

    sliderHp.value = room.settings.maxHp;
    document.getElementById('val-hp').textContent = room.settings.maxHp;

    sliderTime.value = room.settings.timeLimit;
    const mins = Math.floor(room.settings.timeLimit / 60);
    const secs = room.settings.timeLimit % 60;
    document.getElementById('val-time').textContent = `${mins}分${String(secs).padStart(2, '0')}秒 (${room.settings.timeLimit}秒)`;

    toggleAttack.checked = Boolean(room.settings.attackEnabled);
    toggleAttack.disabled = !isHost;

    diffBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.diff === room.settings.difficulty);
        btn.disabled = !isHost;
    });

    sliderHp.disabled = !isHost;
    sliderTime.disabled = !isHost;
    document.getElementById('settings-lock-note').textContent = isHost ? '(あなたがホストです)' : '(ホストのみ変更可能)';

    const startBtn = document.getElementById('btn-start-game');
    if (players.length < 2) {
        document.getElementById('lobby-status-text').textContent = '対戦相手を待っています...';
        startBtn.disabled = true;
        startBtn.textContent = '対戦相手を待っています';
    } else {
        document.getElementById('lobby-status-text').textContent = '対戦準備完了！';
        if (isHost) {
            startBtn.disabled = false;
            startBtn.textContent = '🔥 バトル開始！';
        } else {
            startBtn.disabled = true;
            startBtn.textContent = 'ホストの開始を待っています...';
        }
    }
}

// ホストのルール変更送信
function sendSettingsUpdate() {
    if (!isHost) return;
    const maxHp = Number(document.getElementById('slider-hp').value);
    const timeLimit = Number(document.getElementById('slider-time').value);
    const attackEnabled = document.getElementById('toggle-attack').checked;
    const activeDiffBtn = document.querySelector('.diff-btn.active');
    const difficulty = activeDiffBtn ? activeDiffBtn.dataset.diff : 'medium';

    socket.emit('updateSettings', {
        settings: { maxHp, timeLimit, difficulty, attackEnabled }
    });
}

document.getElementById('slider-hp').addEventListener('input', (e) => {
    document.getElementById('val-hp').textContent = e.target.value;
    sendSettingsUpdate();
});

document.getElementById('slider-time').addEventListener('input', (e) => {
    const val = Number(e.target.value);
    const mins = Math.floor(val / 60);
    const secs = val % 60;
    document.getElementById('val-time').textContent = `${mins}分${String(secs).padStart(2, '0')}秒 (${val}秒)`;
    sendSettingsUpdate();
});

document.getElementById('toggle-attack').addEventListener('change', () => {
    sendSettingsUpdate();
});

document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isHost) return;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sendSettingsUpdate();
    });
});

// ゲーム開始ボタン（ホスト）
document.getElementById('btn-start-game').addEventListener('click', () => {
    if (!isHost || !currentRoom) return;
    const list = getWordListByDifficulty(currentRoom.settings.difficulty);
    const indices = Array.from({ length: list.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    socket.emit('startGame', { wordIndices: indices });
});

// ==========================================
// 3. バトル開始・ダイレクトタイピング判定
// ==========================================
socket.on('gameStarted', (room) => {
    currentRoom = room;
    activeWordList = getWordListByDifficulty(room.settings.difficulty);
    wordOrder = room.wordIndices;
    currentWordPos = 0;

    document.getElementById('battle-timer').textContent = formatTime(room.remainingTime);
    document.getElementById('revive-overlay').classList.add('hidden');

    // ルールに応じたヒント表示
    const hintText = room.settings.attackEnabled
        ? 'ミスで自分HP -1 ／ 単語クリアで相手HP -1！'
        : 'ミスで自分HP -1（単語クリア攻撃OFF：ノーミス勝負！）';
    document.getElementById('battle-rule-hint').textContent = hintText;

    updateBattleHUD(room.players);
    loadNextWord();
    showScreen('battle');
});

socket.on('timerTick', (remainingTime) => {
    document.getElementById('battle-timer').textContent = formatTime(remainingTime);
});

socket.on('updatePlayers', (players) => {
    if (!currentRoom) return;
    currentRoom.players = players;
    updateBattleHUD(players);
});

function updateBattleHUD(players) {
    const self = players[myId];
    const enemy = Object.values(players).find(p => p.id !== myId);

    if (self) {
        document.getElementById('battle-self-name').textContent = self.name;
        document.getElementById('battle-self-score').textContent = self.score;
        document.getElementById('battle-self-hp').textContent = self.hp;
        document.getElementById('battle-self-maxhp').textContent = self.maxHp;
        const pct = Math.max(0, (self.hp / self.maxHp) * 100);
        document.getElementById('battle-self-hp-bar').style.width = `${pct}%`;

        // HPゼロ時の復活オーバーレイ制御
        const reviveOverlay = document.getElementById('revive-overlay');
        if (self.isDead) {
            reviveOverlay.classList.remove('hidden');
            document.getElementById('revive-count').textContent = self.reviveClicks;
            document.getElementById('revive-bar').style.width = `${(self.reviveClicks / 30) * 100}%`;
        } else {
            reviveOverlay.classList.add('hidden');
        }
    }

    if (enemy) {
        document.getElementById('battle-enemy-name').textContent = enemy.name;
        document.getElementById('battle-enemy-score').textContent = enemy.score;
        document.getElementById('battle-enemy-hp').textContent = enemy.hp;
        document.getElementById('battle-enemy-maxhp').textContent = enemy.maxHp;
        const pct = Math.max(0, (enemy.hp / enemy.maxHp) * 100);
        document.getElementById('battle-enemy-hp-bar').style.width = `${pct}%`;
    }
}

function loadNextWord() {
    const idx = wordOrder[currentWordPos % wordOrder.length];
    const wordObj = activeWordList[idx];
    currentWordPos++;

    typingEngine = new TypingEngine(wordObj.kana);
    document.getElementById('word-kana').textContent = wordObj.kana;
    document.getElementById('word-ja').textContent = wordObj.ja;
    renderRomajiGuide();
}

function renderRomajiGuide() {
    if (!typingEngine) return;
    const { typed, untyped } = typingEngine.getDisplayRomaji();
    document.getElementById('romaji-typed').textContent = typed;
    document.getElementById('romaji-untyped').textContent = untyped;
}

// 画面全体のキーボード直接入力イベント
window.addEventListener('keydown', (e) => {
    if (!screens.battle.classList.contains('active')) return;
    if (!currentRoom || currentRoom.status !== 'playing') return;

    const self = currentRoom.players[myId];
    if (!self || self.isDead) return;

    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;

    e.preventDefault();
    document.getElementById('last-key').textContent = e.key;

    const result = typingEngine.inputKey(e.key);
    const stageEl = document.getElementById('typing-stage');

    if (result.status === 'hit') {
        renderRomajiGuide();
        stageEl.classList.remove('miss-flash');
        stageEl.classList.add('hit-glow');
        setTimeout(() => stageEl.classList.remove('hit-glow'), 100);
    } else if (result.status === 'word_completed') {
        renderRomajiGuide();
        socket.emit('wordCompleted');
        loadNextWord();
    } else if (result.status === 'miss') {
        socket.emit('playerMiss');
        stageEl.classList.remove('miss-flash');
        void stageEl.offsetWidth;
        stageEl.classList.add('miss-flash');
    }
});

// 復活ボタン30回連打イベント
document.getElementById('btn-revive-mash').addEventListener('click', () => {
    if (!currentRoom || currentRoom.status !== 'playing') return;
    const self = currentRoom.players[myId];
    if (!self || !self.isDead) return;

    socket.emit('reviveClick');
});

// ==========================================
// 4. リザルト画面
// ==========================================
socket.on('gameEnded', ({ winnerId, players }) => {
    currentRoom.status = 'finished';
    document.getElementById('revive-overlay').classList.add('hidden');

    const self = players[myId];
    const enemy = Object.values(players).find(p => p.id !== myId);
    const banner = document.getElementById('result-banner');

    if (winnerId === myId) {
        banner.textContent = '🏆 VICTORY! 🏆';
        banner.classList.remove('lose');
    } else if (winnerId === null) {
        banner.textContent = '🤝 DRAW 🤝';
        banner.classList.remove('lose');
    } else {
        banner.textContent = '💀 DEFEAT...';
        banner.classList.add('lose');
    }

    if (self) {
        document.getElementById('res-self-name').textContent = `${self.name} (あなた)`;
        document.getElementById('res-self-hp').textContent = self.hp;
        document.getElementById('res-self-score').textContent = self.score;
        document.getElementById('res-self-miss').textContent = self.missCount;
    }
    if (enemy) {
        document.getElementById('res-enemy-name').textContent = enemy.name;
        document.getElementById('res-enemy-hp').textContent = enemy.hp;
        document.getElementById('res-enemy-score').textContent = enemy.score;
        document.getElementById('res-enemy-miss').textContent = enemy.missCount;
    }

    showScreen('result');
});

document.getElementById('btn-back-lobby').addEventListener('click', () => {
    socket.emit('returnToLobby');
});