/* 
	tm.app.CanvasApp �ɂ���
	CanvasApp��Docs�ɂ���tm.display�̗v�f�����ǂ�
	tm.app.BaseApp�̔z����tm.display.CanvasApp������̂�
	tm.app��CanvasApp�v�f���Ăяo�����Ƃ��ł���
	 */
	 
/*
	307200
	921600�@245760
	app.resize( SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();
	app.run();
	��L1�s�ڂ�2�s�ڂ�app����̔h���ł������Ɏ��s���邱�Ƃ͂ł��Ȃ��B
	1�s�ڂ�resize���\�b�h��fitWindow���\�b�h��tm.display.CanvasApp�����`���ꂽ���̂���
	run���\�b�h��tm.app.BaseApp�����`����Ă�����̂����炾�B
	*/
	
/*
	myship���Ƃ��G�l�~�[�̍s���Ɋւ���L�q�͕ʃt�@�C���ɂ���include�������B
	��Xhttp://migelnanai.blog.so-net.ne.jp/2007-04-26���Q�l�ɂ��ď������ɂ��悤�Ǝv��
	*/
	
/*
	�����\���ɑΉ�������
	�N���X��
	World
	
	Player
	PlayerBullet
	
	Enemy
	EnemyBullet
	
	�ɕ�������
	���Ƀ��C���֐��ƃv���C���[�̐؂藣���͕K�v�s��(�����ă��C������this�Ă�ŊԈ���ă��C���ɕԎ�����Ă����邵)
	�W�F�l���[�^�֐��𓜈ߍ\���ɏ��������Ĉ����₷������
	�G��v���C���[��Update�Ƃ�Init�Ƃ���ʊ֐���ʃt�@�C������ǂݍ��߂�悤�ɂ�����
	
	�N���X��update�֐��ł��Ȃ�ł����̃N���X���w�肵�ď��������ΏۂɊ֐��������Ă��܂���
	�㏑�����Ă��܂����Ƃ��ł���
	����ɂ���ăX�[�p�[�N���X�ɑ΂��ăT�u�N���X����邱�Ƃ��ł���
	*/
	
	/*

	Initalize	�X�[�p�[�N���X��Init�Ƃ͕ʂɍs���΂���
	MainLoop	Update�֐����I�[�o�[���C�h���邩Update�֐�����Ăяo���f�t�H�ɂ���
	DrawLoop	��������tmlib��javascript�͏����ƕ`���ʌɕ����Ă����ł͂Ȃ��`���p���������������Ŏ������Ă���ɑ΂��Ė��߂��|�X�g����d�g�݂�݂���΂���
	Finalize	�����Ŏ�����remove���鏈���Ƃ������ŏ����K�v����̂����炱�̕ӂ͑������R
	
	�}�C�N���X���b�h�̎������s����
		*/
/*

var myship;				//���@
var enemies = [];		//�G���X�g
var bullets = [];		//�e���X�g
var SCREEN_WIDTH = 1280;	//�L�����o�Xx��
var SCREEN_HEIGHT = 720;	//�L�����o�Xy��
var score;
var life;

var iff;



//DEFINE ******************************
var SCREEN = "app"
var TITLE ="STG��b�쐬";
var SCREEN_WIDTH = 1280;				//�L�����o�Xx��
var SCREEN_HEIGHT = 720;				//�L�����o�Xy��
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   //�X�N���[�����̔���
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  //�X�N���[�������̔���
var FPS = 60;							//FPS
var FPS_STATS = true;					//Stats�L��
var LAYER_PROPERTY =[					//���C���[�\�[�g�Ή���
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


// ������
tm.game.setup({
  title: "tmlib.js template",
  startLabel: "game", // or "game"
  assets: {
    'tomapiko': 'http://cdn.rawgit.com/phi-jp/phina.js/develop/assets/images/tomapiko.png',
	'Enemy_A': 'script1/graphic/enemy_a.png'
  }
});


/*
 * �Q�[���V�[��
 */
tm.define("GameScene", {
  // �e�N���X���w��
  superClass: "Scene",
  
  // ������
  init: function() {
    // �e�N���X�̏�����
    this.superInit();
    
	application.background="rgba(64, 64, 64, 1.0)";

    // TODO: �����ɃQ�[���̏������������Ă���
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
	
	var app=tm.app.CanvasApp("#"+SCREEN); //html����ID"app"���L�����o�X�A�v���P�[�V�����Ƃ��ēo�^
	app.resize( SCREEN_WIDTH, SCREEN_HEIGHT).fitWindow();	//�A�v���P�[�V�����̈�̉𑜓x�w��A�E�B���h�E�t�B�b�g
	
    app.fps = 60;
    app.enableStats();

	var loading = OriginalLoadingScene({
		assets: ASSETS,
	});
	loading.onload = function() {
		app.replaceScene(MainScene());
	};

	app.background = "rgb(96,96,96)"; // �w�i�F���Z�b�g
	app.run();	//���s
	


	//���[�f�B���O��ʂ��炱�̉�ʂɈڂ��悤�ɂ���
	var scene = app.currentScene;	//�L�����o�X�������V�[�����L��

	score = Texts(100,30);
	score.addChildTo(scene);

	life = Texts(0,SCREEN_HEIGHT);
	life.addChildTo(scene);
	

	myship = Player();
	myship.tasklist = [];
	myship.addChildTo(scene);	//���@�̏o������V�[���ƍ��W��ݒ肷�� addChildat�͐��l�w�肷�邱�Ƃ͂ł��Ȃ�


	scene.update = function(app){
		if(enemies.length<1 && app.frame % 60 == 0  ){
			var enemy = EnemyX01(SCREEN_WIDTH/2+Math.rand(200,-200),SCREEN_HEIGHT/2);
			enemy.addChildTo(this);
		}
	}

});
*/

/*

//�C���^�[�t�F�[�X�N���X******************************
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

	// ���O���[�h
	_preload: function(param) {
		var self = this;

		// ���[�f�B���O���ɐ�s���Ďg���摜�̂ݓǂݍ���
		var loader = tm.asset.Loader();
		loader.onload = function() {
			// ���ۂ̃��[�f�B���O
			self._load(param);
		};

		loader.load({
			//���[�h���ԋ��������@�����[�X���R�����g�A�E�g
			"img_loading": "http://dummyimage.com/256x256/0000ff/ffffff&text=for+Loading.png"
		});

	},

	// ���[�h
	_load: function(param) {
		var self = this;
		// ���[�f�B���O
		var loader = tm.asset.Loader();
		loader.load(param.assets);
		loader.onload = function() {
			// ���[�h�����C�x���g�𔭉�
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

//���C���V�[�� ****************************** 
tm.define("MainScene", {
	superClass : "tm.app.Scene",
	layer : [],					//���C���G���A�쐬
	//������
	init : function() {
		this.superInit();	//�R���X�g���N�^�K�p
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



