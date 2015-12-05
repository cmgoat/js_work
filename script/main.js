// グローバルに展開
phina.globalize();

// 定数
var ASSETS = {
	image: {
		bg: "graphic/bg.jpg",
		pict01: "graphic/pict01.png",
		tomapiko: 'http://cdn.rawgit.com/phi-jp/phina.js/d6eef581e20f2aacde80e895397b6b7bacb0ec15/assets/images/tomapiko_ss.png',
		Particle_Black			:	"graphic/particle/p000.png",
		Particle_Navy			:	"graphic/particle/p001.png",
		Particle_Blue			:	"graphic/particle/p002.png",
		Particle_Green			:	"graphic/particle/p010.png",
		Particle_Teal			:	"graphic/particle/p011.png",
		Particle_DodgerBlue		:	"graphic/particle/p012.png",
		Particle_Lime			:	"graphic/particle/p020.png",
		Particle_SpringGreen	:	"graphic/particle/p021.png",
		Particle_Cyan			:	"graphic/particle/p022.png",
		Particle_Maroon			:	"graphic/particle/p100.png",
		Particle_Purple			:	"graphic/particle/p101.png",
		Particle_LightIndigo	:	"graphic/particle/p102.png",
		Particle_Olive			:	"graphic/particle/p110.png",
		Particle_Gray			:	"graphic/particle/p111.png",
		Particle_Marine			:	"graphic/particle/p112.png",
		Particle_Chartreuse		:	"graphic/particle/p120.png",
		Particle_LightGreen		:	"graphic/particle/p121.png",
		Particle_LightCyan		:	"graphic/particle/p122.png",
		Particle_Red			:	"graphic/particle/p200.png",
		Particle_DeepPink		:	"graphic/particle/p201.png",
		Particle_Magenta		:	"graphic/particle/p202.png",
		Particle_Orange			:	"graphic/particle/p210.png",
		Particle_Lightcoral		:	"graphic/particle/p211.png",
		Particle_Violet			:	"graphic/particle/p212.png",
		Particle_Yellow			:	"graphic/particle/p220.png",
		Particle_LightYellow	:	"graphic/particle/p221.png",
		Particle_White			:	"graphic/particle/p222.png",
	},
};

//ゲームスクリーン
var app;
var SCREEN_WIDTH	= 1280;				//スクリーン幅
var SCREEN_HEIGHT	= 720;				//スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;	//スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;	//スクリーン高さの半分
var GAME_FPS		= 60;				//FPS
var STATS_ENABLE	= true;				//Stats有無

//ゲーム内要素
var PLAYERS			= [];
var ENEMIES			= [];
var BULLETS			= [];



/*
 * メインシーン
 */
phina.define("MainScene", {
	// 継承
	superClass: 'CanvasScene',

	// 初期化
	init: function(options) {
		// super init
		this.superInit(options);

		//レイヤー起動
		this.layer_setup(10,1);

		//
		this.aaa=0;
		this.bbb=0;
		this.ccc=0;
		//this.ActorLayerBase.setOrigin(500,500);
		this.ActorLayerBase.setOrigin(this.aaa,this.bbb);

		//レイヤ毎のソートルール設定
		this.ActorLayer_Property[0].EnableSort=true;
		this.ActorLayer_Property[0].SortRule=function(a,b){if(a.y-b.y == 0){return a.sort_id-b.sort_id;}else{return a.y-b.y;}};

		// 背景
		this.bg = Sprite("bg").addChildTo(this.ActorLayer[8]);
		this.bg.origin.set(0, 0); // 左上基準に変更


		// プレイヤー
		PLAYERS[0]=Player().addChildTo(this.ActorLayer[0]);
		PLAYERS[0].setPosition(400, 400);

		PLAYERS[1]=Sprite('Particle_Red').addChildTo(this.ActorLayer[0]);
		PLAYERS[1].blendMode = 'lighter';
		PLAYERS[1].setPosition(400, 400);
	},

	// 更新
	update: function(app) {
		

		if	(app.keyboard.getKey("q"))	{
			if(this.ActorLayerBase.scale.x < 7){
				this.ActorLayerBase.x-=SCREEN_WIDTH*0.1/2;
				this.ActorLayerBase.y-=SCREEN_HEIGHT*0.1/2;
				this.ActorLayerBase.scale.x +=0.1;
				this.ActorLayerBase.scale.y +=0.1;
			}
		}
		if	(app.keyboard.getKey("w"))	{
			if(this.ActorLayerBase.scale.x > 1){
				this.ActorLayerBase.x+=SCREEN_WIDTH*0.1/2;
				this.ActorLayerBase.y+=SCREEN_HEIGHT*0.1/2;

				this.ActorLayerBase.scale.x -=0.1;
				this.ActorLayerBase.scale.y -=0.1;
			}
		}
		if	(app.keyboard.getKey("i"))	{	this.ActorLayerBase.y+=1;	}
		if	(app.keyboard.getKey("j"))	{	this.ActorLayerBase.x+=1;	}
		if	(app.keyboard.getKey("l"))	{	this.ActorLayerBase.x-=1;	}
		if	(app.keyboard.getKey("k"))	{	this.ActorLayerBase.y-=1;	}

		//ソート対象レイヤ使ってるのでレイヤソート実行
		this.layer_sort();
	},
	


});

/*
 * プレイヤー
 */
phina.define('Player', {
	superClass: 'Sprite',
	init: function() {
		this.superInit("pict01");
		this.spd = 4;
		
	},

	move: function() {
		if	(app.keyboard.getKey("left"))	{this.x -=this.spd;}
		if	(app.keyboard.getKey("right"))	{this.x +=this.spd;}
		if	(app.keyboard.getKey("up"))		{this.y -=this.spd;}
		if	(app.keyboard.getKey("down"))	{this.y +=this.spd;}
		if	(app.keyboard.getKeyDown("z"))		{this.task(this.shots());}
	},
	shot:function(){
		console.log(1);
		var a = CircleShape().addChildTo(this.parent);
		a.x=this.x;
		a.y=this.y-10;
		a.update=function(){
			this.y-=5;
			if(this.y<-50){this.remove;}
			}
		},
	shots: function*(){
		this.shot();
		yield* this.wait(60);
		this.shot();
		yield* this.wait(60);
		this.shot();
		yield* this.wait(60);

	},
	update: function() {
		this.move();
		this.taskrun();
	},
});



/*
 * メイン処理
 */
phina.main(function() {
	// アプリケーションを生成
		app = GameApp({
		query: "#app",
		startLabel: 'title',	// title から開始
		width: SCREEN_WIDTH,	// 画面幅
		height: SCREEN_HEIGHT,	// 画面高さ
		assets: ASSETS,			// アセット読み込み
	});
	
	app.fps=GAME_FPS;			//FPS設定
	if(STATS_ENABLE){app.enableStats();}

	// 実行
	app.run();
});
