// 難易度別の単語・文章リスト（合計190個 + 読み仮名データ）
const wordLists = {
    easy: [
        { ja: "ネコ", kana: "ねこ" }, { ja: "イヌ", kana: "いぬ" }, { ja: "リンゴ", kana: "りんご" }, { ja: "ミカン", kana: "みかん" }, { ja: "サクラ", kana: "さくら" },
        { ja: "ウミ", kana: "うみ" }, { ja: "ソラ", kana: "そら" }, { ja: "カゼ", kana: "かぜ" }, { ja: "アメ", kana: "あめ" }, { ja: "ユキ", kana: "ゆき" },
        { ja: "スシ", kana: "すし" }, { ja: "ラーメン", kana: "らーめん" }, { ja: "カレー", kana: "かれー" }, { ja: "お茶", kana: "おちゃ" }, { ja: "水", kana: "みず" },
        { ja: "学校", kana: "がっこう" }, { ja: "先生", kana: "せんせい" }, { ja: "友達", kana: "ともだち" }, { ja: "勉強", kana: "べんきょう" }, { ja: "本", kana: "ほん" },
        { ja: "時計", kana: "とけい" }, { ja: "電話", kana: "でんわ" }, { ja: "車", kana: "くるま" }, { ja: "電車", kana: "でんしゃ" }, { ja: "駅", kana: "えき" },
        { ja: "家", kana: "いえ" }, { ja: "部屋", kana: "へや" }, { ja: "窓", kana: "まど" }, { ja: "机", kana: "つくえ" }, { ja: "椅子", kana: "いす" },
        { ja: "ウェブ", kana: "うぇぶ" }, { ja: "アプリ", kana: "あぷり" }, { ja: "サイト", kana: "さいと" }, { ja: "リンク", kana: "りんく" }, { ja: "コード", kana: "こーど" },
        { ja: "バグ", kana: "ばぐ" }, { ja: "ログ", kana: "ろぐ" }, { ja: "データ", kana: "でーた" }, { ja: "キー", kana: "きー" }, { ja: "マウス", kana: "まうす" },
        { ja: "画面", kana: "がめん" }, { ja: "保存", kana: "ほぞん" }, { ja: "削除", kana: "さくじょ" }, { ja: "追加", kana: "ついか" }, { ja: "検索", kana: "けんさく" },
        { ja: "開く", kana: "ひらく" }, { ja: "閉じる", kana: "とじる" }, { ja: "印刷", kana: "いんさつ" }, { ja: "終了", kana: "しゅうりょう" }, { ja: "開始", kana: "かいし" },
        { ja: "朝", kana: "あさ" }, { ja: "昼", kana: "ひる" }, { ja: "夜", kana: "よる" }, { ja: "今日", kana: "きょう" }, { ja: "明日", kana: "あした" },
        { ja: "昨日", kana: "きのう" }, { ja: "毎日", kana: "まいにち" }, { ja: "時計", kana: "とけい" }, { ja: "財布", kana: "さいふ" }, { ja: "服", kana: "ふく" }
    ],
    medium: [
        { ja: "インターネット", kana: "いんたーねっと" }, { ja: "プログラミング", kana: "ぷろぐらみんぐ" },
        { ja: "エンジニア", kana: "えんじにあ" }, { ja: "フロントエンド", kana: "ふろんとえんど" },
        { ja: "バックエンド", kana: "ばっくえんど" }, { ja: "ソフトウェア", kana: "そふとうぇあ" },
        { ja: "ハードウェア", kana: "はーどうぇあ" }, { ja: "パソコン", kana: "ぱそこん" },
        { ja: "キーボード", kana: "きーぼーど" }, { ja: "ディスプレイ", kana: "でぃすぷれい" },
        { ja: "ブラウザ", kana: "ぶらうざ" }, { ja: "サーバー", kana: "さーばー" },
        { ja: "クラウド", kana: "くらうど" }, { ja: "ネットワーク", kana: "ねっとわーく" },
        { ja: "セキュリティ", kana: "せきゅりてぃ" }, { ja: "データベース", kana: "でーたべーす" },
        { ja: "関数", kana: "かんすう" }, { ja: "変数", kana: "へんすう" },
        { ja: "配列", kana: "はいれつ" }, { ja: "条件分岐", kana: "じょうけんぶんき" },
        { ja: "繰り返し", kana: "くりかえし" }, { ja: "オブジェクト", kana: "おぶじぇくと" },
        { ja: "クラス", kana: "くらす" }, { ja: "メソッド", kana: "めそっど" },
        { ja: "引数", kana: "ひきすう" }, { ja: "戻り値", kana: "もどりち" },
        { ja: "開発環境", kana: "かいはつかんきょう" }, { ja: "テキストエディタ", kana: "てきすとえでぃた" },
        { ja: "スマートフォン", kana: "すまーとふぉん" }, { ja: "タブレット", kana: "たぶれっと" },
        { ja: "コミュニケーション", kana: "こみゅにけーしょん" }, { ja: "セットアップ", kana: "せっとあっぷ" },
        { ja: "スケジュール", kana: "すけじゅーる" }, { ja: "ミーティング", kana: "みーてぃんぐ" },
        { ja: "タスク", kana: "たすく" }, { ja: "デザイン", kana: "でざいん" },
        { ja: "イラスト", kana: "いらすと" }, { ja: "アニメーション", kana: "あにめーしょん" },
        { ja: "グラフィック", kana: "ぐらふぃっく" }, { ja: "クリエイター", kana: "くりえいたー" },
        { ja: "お好み焼き", kana: "おこのみやき" }, { ja: "たこ焼き", kana: "たこやき" },
        { ja: "ハンバーグ", kana: "はんばーぐ" }, { ja: "スパゲッティ", kana: "すぱげってぃ" },
        { ja: "サンドイッチ", kana: "さんどいっち" }, { ja: "新幹線", kana: "しんかんせん" },
        { ja: "飛行機", kana: "ひこうき" }, { ja: "自転車", kana: "じてんしゃ" },
        { ja: "自動車", kana: "じどうしゃ" }, { ja: "ヘリコプター", kana: "へりこぷたー" },
        { ja: "図書館", kana: "としょかん" }, { ja: "映画館", kana: "えいがかん" },
        { ja: "博物館", kana: "はくぶつかん" }, { ja: "水族館", kana: "すいぞくかん" },
        { ja: "動物園", kana: "どうぶつえん" }, { ja: "桜前線", kana: "さくらぜんせん" },
        { ja: "五月晴れ", kana: "さつきばれ" }, { ja: "秋晴れ", kana: "あきばれ" },
        { ja: "小春日和", kana: "こはるびより" }, { ja: "淡雪", kana: "あわゆき" },
        { ja: "大掃除", kana: "おおそうじ" }, { ja: "引越し", kana: "ひっこし" },
        { ja: "模様替え", kana: "もようがえ" }, { ja: "買い物", kana: "かいもの" },
        { ja: "旅行", kana: "りょこう" }, { ja: "料理", kana: "りょうり" },
        { ja: "洗濯", kana: "せんたく" }, { ja: "掃除", kana: "そうじ" },
        { ja: "育児", kana: "いくじ" }, { ja: "仕事", kana: "しごと" },
        { ja: "システムエンジニア", kana: "しすてむえんじにあ" }, { ja: "オープンソース", kana: "おーぷんそーす" },
        { ja: "バージョン管理", kana: "ばーじょんかんり" }, { ja: "アルゴリズム", kana: "あるごりずむ" },
        { ja: "インフラストラクチャ", kana: "いんふらすとらくちゃ" }, { ja: "コンパイル", kana: "こんぱいる" },
        { ja: "デバッグ作業", kana: "でばっぐさぎょう" }, { ja: "フレームワーク", kana: "ふれーむわーく" },
        { ja: "ソースコード", kana: "そーすこーど" }, { ja: "アップデート", kana: "あっぷでーと" },
        { ja: "ビジネスモデル", kana: "びじねすもでる" }, { ja: "プレゼンテーション", kana: "ぷれぜんてーしょん" },
        { ja: "マーケティング", kana: "まーけてぃんぐ" }, { ja: "コストパフォーマンス", kana: "こすとぱふぉーまんす" },
        { ja: "イノベーション", kana: "いのべーしょん" }, { ja: "モチベーション", kana: "もちべーしょん" },
        { ja: "ライフスタイル", kana: "らいふすたいる" }, { ja: "プライベート", kana: "ぷらいべーと" },
        { ja: "エンターテインメント", kana: "えんたーていんめんと" }, { ja: "カフェラテ", kana: "かふぇらて" },
        { ja: "アイスクリーム", kana: "あいすくりーむ" }, { ja: "チョコレート", kana: "ちょこれーと" },
        { ja: "フライドポテト", kana: "ふらいどぽてと" }, { ja: "ピザトースト", kana: "ぴざとーすと" },
        { ja: "オムライス", kana: "おむらいす" }, { ja: "スカイツリー", kana: "すかいつりー" },
        { ja: "テーマパーク", kana: "てーまぱーく" }, { ja: "ショッピングモール", kana: "しょっぴんぐもーる" },
        { ja: "コインランドリー", kana: "こいんらんどりー" }, { ja: "コンビニエンスストア", kana: "こんびにえんすすとあ" },
        { ja: "人工知能", kana: "じんこうちのう" }, { ja: "機械学習", kana: "きかいがくしゅう" },
        { ja: "深層学習", kana: "しんそうがくしゅう" }, { ja: "データサイエンス", kana: "でーたさいえんす" },
        { ja: "サイバーセキュリティ", kana: "さいばーせきゅりてぃ" }, { ja: "クラウドファンディング", kana: "くらうどふぁんでぃんぐ" },
        { ja: "ソーシャルメディア", kana: "そーしゃるめでぃあ" }, { ja: "ユーザーインターフェース", kana: "ゆーざーいんたーふぇーす" },
        { ja: "アプリケーション", kana: "あぷりけーしょん" }, { ja: "プログラミング言語", kana: "ぷろぐらみんぐげんご" },
        { ja: "統合開発環境", kana: "とうごうかいはつかんきょう" }, { ja: "オブジェクト指向", kana: "おぶじぇくとしこう" },
        { ja: "データベース管理", kana: "でーたべーすかんり" }, { ja: "情報セキュリティ", kana: "じょうほうせきゅりてぃ" },
        { ja: "分散処理", kana: "ぶんさんしょり" }, { ja: "並行処理", kana: "へいこうしょり" },
        { ja: "暗号化技術", kana: "あんごうかぎじゅつ" }, { ja: "仮想現実", kana: "かそうげんじつ" },
        { ja: "拡張現実", kana: "かくちょうげんじつ" }, { ja: "量子コンピューティング", kana: "りょうしこんぴゅーてぃんぐ" },
        { ja: "自動運転", kana: "じどううんてん" }, { ja: "電気自動車", kana: "でんきじどうしゃ" },
        { ja: "再生可能エネルギー", kana: "さいせいかのうえねるぎー" }, { ja: "地球温暖化", kana: "ちきゅうおんだんか" },
        { ja: "持続可能性", kana: "じぞくかのうせい" }, { ja: "国際連合", kana: "こくさいれんごう" },
        { ja: "宇宙飛行士", kana: "うちゅうひこうし" }, { ja: "天体観測", kana: "てんたいかんそく" },
        { ja: "自然科学", kana: "しぜんかがく" }, { ja: "人間関係", kana: "にんげんかんけい" },
        { ja: "自己啓発", kana: "じこけいはつ" }, { ja: "タイムマネジメント", kana: "たいむまねじめんと" },
        { ja: "プロジェクトマネジメント", kana: "ぷろじぇくとまねじめんと" }, { ja: "ワークライフバランス", kana: "わーくらいふばらんす" },
        { ja: "リモートワーク", kana: "りもーとわーく" }, { ja: "テレワーク", kana: "てれわーく" },
        { ja: "オンラインショップ", kana: "おんらいんしょっぷ" }, { ja: "キャッシュレス決済", kana: "きゃっしゅれすけっさい" },
        { ja: "ファストフード", kana: "ふぁすとふーど" }, { ja: "ファミリーレストラン", kana: "ふぁみりーれすとらん" },
        { ja: "スーパーマーケット", kana: "すーぱーまーけっと" }, { ja: "ホームセンター", kana: "ほーむせんたー" },
        { ja: "ドラッグストア", kana: "どらっぐすとあ" }, { ja: "アミューズメント施設", kana: "あみゅーずめんとしせつ" },
        { ja: "天体望遠鏡", kana: "てんたいぼうえんきょう" }, { ja: "電子レンジ", kana: "でんしれんじ" },
        { ja: "全自動洗濯機", kana: "ぜんじどうせんたくき" }, { ja: "空気清浄機", kana: "くうきせいじょうき" },
        { ja: "ロボット掃除機", kana: "ろぼっとそうじき" }, { ja: "電気ケトル", kana: "でんきけとる" }
    ],
    hard: [
        { ja: "犬も歩けば棒に当たる", kana: "いぬもあるけばぼうにあたる" },
        { ja: "論より証拠", kana: "ろんよりしょうこ" },
        { ja: "花より団子", kana: "はなよりだんご" },
        { ja: "塵も積もれば山となる", kana: "ちりもつもればやまとなる" },
        { ja: "弘法にも筆の誤り", kana: "こうぼうにもふでのあやまり" },
        { ja: "猿も木から落ちる", kana: "さるもきからおちる" },
        { ja: "急がば回れ", kana: "いそがばまわれ" },
        { ja: "情けは人の為ならず", kana: "なさけはひとのためならず" },
        { ja: "石の上にも三年", kana: "いしのうえにもさんねん" },
        { ja: "灯台下暗し", kana: "とうだいもとくらし" },
        { ja: "一生懸命", kana: "いっしょうけんめい" },
        { ja: "絶体絶命", kana: "ぜったいぜつめい" },
        { ja: "危機一髪", kana: "ききいっぱつ" },
        { ja: "弱肉強食", kana: "じゃくにくきょうしょく" },
        { ja: "適材適所", kana: "てきざいてきしょ" },
        { ja: "以心伝心", kana: "いしんでんしん" },
        { ja: "一石二鳥", kana: "いっせきにちょう" },
        { ja: "十人十色", kana: "じゅうにんといろ" },
        { ja: "森羅万象", kana: "しんらばんしょう" },
        { ja: "一期一会", kana: "いちごいちえ" },
        { ja: "習うより慣れろ", kana: "ならうよりなれろ" },
        { ja: "好きこそ物の上手なれ", kana: "すきこそもののじょうずなれ" },
        { ja: "継続は力なり", kana: "けいぞくはちからなり" },
        { ja: "失敗は成功の母", kana: "しっぱいはせいこうのはは" },
        { ja: "早起きは三文の徳", kana: "はやおきはさんもんのとく" },
        { ja: "案ずるより産むが易し", kana: "あんずるよりうむがやすし" },
        { ja: "捕らぬタヌキの皮算用", kana: "とらぬたぬきのかわざんよう" },
        { ja: "壁に耳あり障子に目あり", kana: "かべにみみありしょうじにめあり" },
        { ja: "笑う門には福来たる", kana: "わらうかどにはふくきたる" },
        { ja: "初心忘るべからず", kana: "しょしんわするべからず" }
    ],
    goat: [
        { ja: "世田谷区", kana: "よたたにく" },
        { ja: "沖縄県", kana: "りゅうしおうこく" },
        { ja: "ともえ", kana: "ともえ" },
        { ja: "ともえとインドカレーにいく", kana: "ともえといんどかれーにいく" },
        { ja: "アルゴリズム検定3級もっている", kana: "あるごりずむけんてい3きゅうもっている" },
        { ja: "うんめ", kana: "うんめ" },
        { ja: "豊島区", kana: "とよしまく" },
        { ja: "狭山から狭山に引っ越し", kana: "さやまからさやまにひっこし" },
        { ja: "富加で遊んだ", kana: "とみかであそんだ" },
        { ja: "キリン組", kana: "きりんぐみ" },
        { ja: "すき屋や好きや", kana: "すきやがすきや" },
        { ja: "アルゴリズム検定1級だし", kana: "あるごりずむけんてい1きゅうだし" },
        { ja: "おれ一卵性双生児", kana: "おれいちらんせいそうせいじ" },
        { ja: "1分先に俺が生まれた", kana: "1ぷんさきにおれがうまれた" },
        { ja: "埼玉県立狭山経済高等学校", kana: "さいたまけんりつさやまけいざいこうとうがっこう" },
        { ja: "狭山茶", kana: "さやまちゃ" },
        { ja: "浅草幼稚園", kana: "あさくさようちえん" },
        { ja: "音楽会でリコーダーを落とした", kana: "おんがくかいでりこーだーをおとした" },
        { ja: "すにゃいぱー", kana: "すにゃいぱー" },
        { ja: "町田商店が一番おいしい", kana: "まちだしょうてんがいちばんおいしい" },
        { ja: "田所商店いく？", kana: "たどころしょうてんいく？" },
        { ja: "シーって海なのか", kana: "しーってうみなのか" }
    ]
};

// 1. ベースとなる1文字ずつのローマ字マップ
const baseRomajiMap = {
    'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
    'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
    'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
    'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
    'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
    'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
    'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
    'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
    'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
    'わ': ['wa'], 'を': ['wo'], 'ん': ['nn', 'n', 'xn'],
    'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
    'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
    'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
    'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
    'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
    'ゔ': ['vu'],
    'ー': ['-'], '。': ['.'], '、': [','], '？': ['?'], '?': ['?'], '！': ['!'], '!': ['!'],
    '0': ['0'], '1': ['1'], '2': ['2'], '3': ['3'], '4': ['4'],
    '5': ['5'], '6': ['6'], '7': ['7'], '8': ['8'], '9': ['9'],

    // 小文字（単体入力用）
    'ぁ': ['la', 'xa'], 'ぃ': ['li', 'xi'], 'ぅ': ['lu', 'xu'], 'ぇ': ['le', 'xe'], 'ぉ': ['lo', 'xo'],
    'っ': ['ltu', 'xtu', 'ltsu'],
    'ゃ': ['lya', 'xya'], 'ゅ': ['lyu', 'xyu'], 'ょ': ['lyo', 'xyo']
};

// 2. 特殊な連打・合体打ち（kya, sha, hulo など）を定義するマップ
const comboRomajiMap = {
    'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
    'しゃ': ['sha', 'sya'], 'しぃ': ['syi'], 'しゅ': ['shu', 'syu'], 'しぇ': ['she', 'sye'], 'しょ': ['sho', 'syo'],
    'ちゃ': ['cha', 'tya'], 'ちぃ': ['tyi'], 'ちゅ': ['chu', 'tyu'], 'ちぇ': ['che', 'tye'], 'ちょ': ['cho', 'tyo'],
    'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
    'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
    'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
    'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
    'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
    'じゃ': ['ja', 'zya', 'jya'], 'じぃ': ['zyi', 'jyi'], 'じゅ': ['ju', 'zyu', 'jyu'], 'じぇ': ['zje', 'zye', 'je', 'jye'], 'じょ': ['jo', 'zyo', 'jyo'],
    'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye'], 'ぢょ': ['dyo'],
    'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
    'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],
    'てぃ': ['thi', 'tsi'], 'てゅ': ['thu'], 'でぃ': ['dhi'], 'でゅ': ['dhu'],
    'つぁ': ['tsa'], 'つぃ': ['tsi'], 'つぇ': ['tse'], 'つぉ': ['tso'],
    'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'],
    'うぉ': ['who'], 'うぃ': ['wi'], 'うぇ': ['we'],
    'ゔゃ': ['vya'], 'ゔゅ': ['vyu'], 'ゔょ': ['vyo']
};

// 3. 自動補完ロジックを実行して最終的な romajiMap を生成
const romajiMap = { ...baseRomajiMap, ...comboRomajiMap };

for (const [key, combos] of Object.entries(comboRomajiMap)) {
    if (key.length === 2) {
        const firstChar = key[0];
        const secondChar = key[1];
        const firstPatterns = baseRomajiMap[firstChar] || [];
        const secondPatterns = baseRomajiMap[secondChar] || [];

        for (const f of firstPatterns) {
            for (const s of secondPatterns) {
                const combined = f + s;
                if (!combos.includes(combined)) {
                    combos.push(combined);
                }
            }
        }
    }
    romajiMap[key] = Array.from(new Set(combos)).sort((a, b) => {
        const hasSpecialA = /^[lx]|[^a-z][lx]/i.test(a);
        const hasSpecialB = /^[lx]|[^a-z][lx]/i.test(b);
        if (hasSpecialA !== hasSpecialB) return hasSpecialA ? 1 : -1;
        return a.length - b.length;
    });
}

// ==========================================
// 全通り対応・リアルタイムローマ字判定エンジン
// ==========================================
class TypingEngine {
    constructor(kanaText) {
        this.kanaText = kanaText;
        this.tokens = this.tokenize(kanaText);
        this.tokenIndex = 0;
        this.currentInput = ""; // 現在のトークンで入力済みの文字列
        this.confirmedRomaji = ""; // 確定済みのローマ字文字列
    }

    // かな文字列を最小単位のトークン配列と許可ローマ字リストに分解
    tokenize(kana) {
        const tokens = [];
        let i = 0;
        while (i < kana.length) {
            const char = kana[i];
            const nextChar = kana[i + 1] || "";
            const twoChars = char + nextChar;

            // 1. 「っ（促音）」の処理
            if (char === 'っ' && nextChar) {
                const basePatterns = [...(romajiMap['っ'] || ['ltu', 'xtu', 'ltsu'])];
                // 次の文字（または2文字コンボ）のローマ字候補から子音重ねを生成
                let nextPatterns = [];
                if (i + 2 < kana.length && romajiMap[kana.slice(i + 1, i + 3)]) {
                    nextPatterns = romajiMap[kana.slice(i + 1, i + 3)];
                } else if (romajiMap[nextChar]) {
                    nextPatterns = romajiMap[nextChar];
                }

                // 母音・ん以外の先頭子音を重ねるパターンを追加
                nextPatterns.forEach(p => {
                    const firstLetter = p[0];
                    if (firstLetter && !['a', 'i', 'u', 'e', 'o', 'n'].includes(firstLetter)) {
                        if (!basePatterns.includes(firstLetter)) {
                            basePatterns.unshift(firstLetter); // 短い子音重ねを最優先表示に
                        }
                    }
                });

                tokens.push({ kana: 'っ', patterns: basePatterns });
                i++;
                continue;
            }

            // 2. 「ん（撥音）」の処理
            if (char === 'ん') {
                // 末尾、または次が母音(あいうえお)・ナ行・ヤ行・ん の場合は 'n' 単体不可 ('nn' か 'xn')
                const needDoubleN = !nextChar || /^[あいうえおなにぬねのやゆよん]/.test(nextChar);
                const patterns = needDoubleN ? ['nn', 'xn'] : ['n', 'nn', 'xn'];
                tokens.push({ kana: 'ん', patterns });
                i++;
                continue;
            }

            // 3. 2文字コンボ（きゃ、しゃ、ふぉ等）の処理
            if (nextChar && romajiMap[twoChars]) {
                tokens.push({ kana: twoChars, patterns: romajiMap[twoChars] });
                i += 2;
                continue;
            }

            // 4. 通常の1文字処理
            if (romajiMap[char]) {
                tokens.push({ kana: char, patterns: romajiMap[char] });
            } else {
                // マップにない記号や英数字はそのまま許容
                tokens.push({ kana: char, patterns: [char.toLowerCase()] });
            }
            i++;
        }
        return tokens;
    }

    // キー入力を判定する
    inputKey(key) {
        if (this.isCompleted()) return { status: 'completed' };

        const char = key.toLowerCase();
        const currentToken = this.tokens[this.tokenIndex];
        const candidateInput = this.currentInput + char;

        // 現在の入力に前方一致するパターンを探す
        const matchedPatterns = currentToken.patterns.filter(p => p.startsWith(candidateInput));

        if (matchedPatterns.length > 0) {
            this.currentInput = candidateInput;

            // 完全一致したパターンがあるか？
            // 注意: 「ん」で 'n' を打った直後、次の文字が母音等でなければ 'n' で確定できるが、
            // もしユーザーが 'nn' と2回打つ派の場合、次のキーで 'n' が来たら吸収する
            if (matchedPatterns.includes(this.currentInput)) {
                // まだ長い候補（例: 'n' に対する 'nn'）が残っている場合でも一旦トークン確定とするか判定
                if (currentToken.kana === 'ん' && this.currentInput === 'n' && currentToken.patterns.includes('nn')) {
                    this.pendingSingleN = true;
                } else {
                    this.pendingSingleN = false;
                }

                this.confirmedRomaji += this.currentInput;
                this.currentInput = "";
                this.tokenIndex++;

                return {
                    status: this.isCompleted() ? 'word_completed' : 'hit'
                };
            }

            return { status: 'hit' };
        }

        // 直前に「ん」を 'n' 1文字で確定した直後に、続けて 'n' を押した場合はミスにせず吸収する
        if (this.pendingSingleN && char === 'n' && this.currentInput === "") {
            this.pendingSingleN = false;
            this.confirmedRomaji += 'n';
            return { status: 'hit' };
        }

        this.pendingSingleN = false;
        return { status: 'miss' };
    }

    isCompleted() {
        return this.tokenIndex >= this.tokens.length;
    }

    // 画面表示用のローマ字ガイド文字列を取得（入力済み ＋ 残りガイド）
    getDisplayRomaji() {
        let remaining = "";
        for (let i = this.tokenIndex; i < this.tokens.length; i++) {
            const token = this.tokens[i];
            if (i === this.tokenIndex && this.currentInput.length > 0) {
                const bestMatch = token.patterns.find(p => p.startsWith(this.currentInput)) || token.patterns[0];
                remaining += bestMatch.slice(this.currentInput.length);
            } else {
                remaining += token.patterns[0];
            }
        }
        return {
            typed: this.confirmedRomaji + this.currentInput,
            untyped: remaining
        };
    }
}