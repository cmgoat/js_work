/* 
	tm.app.CanvasApp について
	CanvasAppはDocsによるとtm.displayの要素だけども
	tm.app.BaseAppの配下にtm.display.CanvasAppがあるので
	tm.appはCanvasApp要素を呼び出すことができる
	 */
	 
/*
	307200
	921600　245760
	app.resize( SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();
	app.run();
	上記1行目と2行目はappからの派生でも同時に実行することはできない。
	1行目のresizeメソッドもfitWindowメソッドもtm.display.CanvasAppから定義されたものだが
	runメソッドはtm.app.BaseAppから定義されているものだからだ。
	*/
	
/*
	myshipだとかエネミーの行動に関する記述は別ファイルにしてincludeしたい。
	後々http://migelnanai.blog.so-net.ne.jp/2007-04-26を参考にして小分けにしようと思う
	*/
	
/*
	文字表示に対応したら
	クラスを
	World
	
	Player
	PlayerBullet
	
	Enemy
	EnemyBullet
	
	に分割する
	特にメイン関数とプレイヤーの切り離しは必要不可欠(だってメイン内でthis呼んで間違ってメインに返事されても困るし)
	ジェネレータ関数を糖衣構文に書き換えて扱いやすくする
	敵やプレイヤーのUpdateとかInitとかを別関数や別ファイルから読み込めるようにしたい
	
	クラスのupdate関数でもなんでもそのクラスを指定して書き換え対象に関数を代入してしまえば
	上書きしてしまうことができる
	これによってスーパークラスに対してサブクラスを作ることができる
	*/
	
	/*

	Initalize	スーパークラスのInitとは別に行えばいい
	MainLoop	Update関数をオーバーライドするかUpdate関数から呼び出しデフォにする
	DrawLoop	そもそもtmlibやjavascriptは処理と描画を別個に分けている訳ではない描画専用処理部分を自分で実装してそれに対して命令をポストする仕組みを設ければいい
	Finalize	自分で自分をremoveする処理とか自分で書く必要あるのだからこの辺は相当自由
	
	マイクロスレッドの実装を行おう
		*/
/*

var myship;				//自機
var enemies = [];		//敵リスト
var bullets = [];		//弾リスト
var SCREEN_WIDTH = 1280;	//キャンバスx幅
var SCREEN_HEIGHT = 720;	//キャンバスy幅
var score;
var life;

var iff;



//DEFINE ******************************
var SCREEN = "app"
var TITLE ="STG基礎作成";
var SCREEN_WIDTH = 1280;				//キャンバスx幅
var SCREEN_HEIGHT = 720;				//キャンバスy幅
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   //スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  //スクリーン高さの半分
var FPS = 60;							//FPS
var FPS_STATS = true;					//Stats有無
var LAYER_PROPERTY =[					//レイヤーソート対応可否
	{enableSort:true},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false},
	{enableSort:false}
	];
//var myship;
//ASSET ******************************
//ASSET ******************************
var ASSETS = {
	"EnemyA":  "script1/graphic/enemy_a.png",
};
// ******************************
*/


// 初期化
tm.game.setup({
  title: "tmlib.js template",
  startLabel: "game", // or "game"
  assets: {
    'tomapiko': 'http://cdn.rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko.png',
	'Enemy_A': 'script1/graphic/enemy_a.png'
  }
});


/*
 * ゲームシーン
 */
tm.define("GameScene", {
  // 親クラスを指定
  superClass: "Scene",
  
  // 初期化
  init: function() {
    // 親クラスの初期化
    this.superInit();
    
	application.background="rgba(64, 64, 64, 1.0)";

    // TODO: ここにゲームの処理を実装していく
    var label = Label("Hello, runstant!").addChildTo(this);
    label.x = SCREEN_CENTER_X;
    label.y = SCREEN_CENTER_Y-100;
    label.fillStyle = "black";
    label.fontSize = 64;
    
    var sprite = Sprite('Enemy_A').addChildTo(this);
    sprite.x = SCREEN_CENTER_X;
    sprite.y = SCREEN_CENTER_Y;
    sprite.scale.set(0.425, 0.425);
  },
});



/*
tm.main(function(){
	
	var app=tm.app.CanvasApp("#"+SCREEN); //html側のID"app"をキャンバスアプリケーションとして登録
	app.resize( SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();	//アプリケーション領域の解像度指定、ウィンドウフィット
	
    app.fps = 60;
    app.enableStats();

	var loading = OriginalLoadingScene({
		assets: ASSETS,
	});
	loading.onload = function() {
		app.replaceScene(MainScene());
	};

	app.background = "rgb(96,96,96)"; // 背景色をセット
	app.run();	//実行
	


	//ローディング画面からこの画面に移れるようにする
	var scene = app.currentScene;	//キャンバスが示すシーンを記憶

	score = Texts(100,30);
	score.addChildTo(scene);

	life = Texts(0,SCREEN_HEIGHT);
	life.addChildTo(scene);
	

	myship = Player();
	myship.tasklist = [];
	myship.addChildTo(scene);	//自機の出現するシーンと座標を設定する addChildatは数値指定することはできない


	scene.update = function(app){
		if(enemies.length<1 && app.frame % 60 == 0  ){
			var enemy = EnemyX01(SCREEN_WIDTH/2+Math.rand(200,-200),SCREEN_HEIGHT/2);
			enemy.addChildTo(this);
		}
	}

});
*/

/*

//インターフェースクラス******************************
var Texts = tm.createClass({
	superClass: tm.app.Label,
	init:function(x,y){
		this.superInit("0");
		this.setPosition(x,y);
		this.value=0;
	},
	update:function(app){
		this.text=this.value;
	}
});
//******************************

// ******************************
tm.define("OriginalLoadingScene", {
	superClass: "tm.app.Scene",
	init: function(param) {
		this.superInit();
		this._preload(param);
		this.f=0;
	var Label = tm.display.Label("Now Loading...")
		.setBaseline("top")
		.setAlign("center")
		.setPosition(SCREEN_CENTER_X,SCREEN_CENTER_Y)
		.addChildTo(this);
	LoadParticle();
	},

	// 事前ロード
	_preload: function(param) {
		var self = this;

		// ローディング時に先行して使う画像のみ読み込む
		var loader = tm.asset.Loader();
		loader.onload = function() {
			// 実際のローディング
			self._load(param);
		};

		loader.load({
			//ロード時間強制発生　リリース時コメントアウト
			"img_loading": "http://dummyimage.com/256x256/0000ff/ffffff&text=for+Loading.png"
		});

	},

	// ロード
	_load: function(param) {
		var self = this;
		// ローディング
		var loader = tm.asset.Loader();
		loader.load(param.assets);
		loader.onload = function() {
			// ロード完了イベントを発火
			var e = tm.event.Event("load");
			//self.fire(e);
		};
	}
	,update: function(app) {
		
		this.f+=2;
		this.fr=this.f*Math.DEG_TO_RAD
		var Obj=Particle(SCREEN_CENTER_X+Math.cos(this.fr)*150,SCREEN_CENTER_Y*1.5+Math.sin(this.fr)*50,2).addChildTo(this);
		Obj.setKeep(60);
		Obj.setScale(2);
		Obj.setScale_a(-1/30);

		this.fr=(this.f+180)*Math.DEG_TO_RAD
		var Obj=Particle(SCREEN_CENTER_X+Math.cos(this.fr)*150,SCREEN_CENTER_Y*1.5+Math.sin(this.fr)*50,2).addChildTo(this);
		Obj.setKeep(60);
		Obj.setScale(2);
		Obj.setScale_a(-1/30);
	}

});
// ******************************

//メインシーン ****************************** 
tm.define("MainScene", {
	superClass : "tm.app.Scene",
	layer : [],					//レイヤエリア作成
	//初期化
	init : function() {
		this.superInit();	//コンストラクタ適用
		this.f=0;

	var Label = tm.display.Label("Load End")
		.setBaseline("top")
		.setAlign("center")
		.setPosition(SCREEN_CENTER_X,SCREEN_CENTER_Y)
		.addChildTo(this);

	},
	update: function(app) {
		
		}
});
// ******************************


*/



