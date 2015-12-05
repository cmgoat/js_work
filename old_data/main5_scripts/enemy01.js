//敵クラス******************************
/*
var Enemy001 = tm.createClass({	//クラス定義を行う
	superClass: tm.app.TriangleShape,	//三角形とする
	init:function(x, y){				//引数2　X座標　Y座標
		this.superInit(30,30,{			//サイズは30で直接指定
			fillStyle:"red"				//塗りつぶし赤
		});
		this.hp 	= 1;				//残りライフ
		this.setPosition(x,y);			//引数で指定された座標へ設定する
		enemies.push(this);				//敵リストに自分を登録する

	},
	update: function(app){		//更新時処理
		
		//攻撃処理
		var direction =Math.atan2(myship.y - this.y, myship.x - this.x) * Math.RAD_TO_DEG;	//atan2で自機への方角を取得し度数法へ変換
		this.setRotation(direction+90);	//90度加算して方向補正
		
		if(Math.random() < 0.01){
			EnemyBullet(this.x,this.y,9,this.rotation-90).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,9,this.rotation-90+1).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,9,this.rotation-90-1).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,9,this.rotation-90+2).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,9,this.rotation-90-2).addChildTo(this.parent);
			
			EnemyBullet(this.x,this.y,10.5,this.rotation-90+50).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,10.0,this.rotation-90+1+50).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,10.0,this.rotation-90-1+50).addChildTo(this.parent);
			
			EnemyBullet(this.x,this.y,10.5,this.rotation-90-50).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,10.0,this.rotation-90+1-50).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,10.0,this.rotation-90-1-50).addChildTo(this.parent);
			
			EnemyBullet(this.x,this.y,2.0,this.rotation-90+30).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,2.0,this.rotation-90-30).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,2.0,this.rotation-90+60).addChildTo(this.parent);
			EnemyBullet(this.x,this.y,2.0,this.rotation-90-60).addChildTo(this.parent);
		}
		
		if(Math.random() < 0.00075){
			for(var j = 0; j < 6; j++){
				EnemyBullet(this.x,this.y,5+j*0.125,this.rotation-90).addChildTo(this.parent);
				for(var i = 0; i < 10; i++){
				EnemyBullet(this.x,this.y,5+j*0.125,this.rotation-90+i*6).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,5+j*0.125,this.rotation-90-i*6).addChildTo(this.parent);
				}
			}
		}
		
		if(Math.random() < 0.00025){
			for(var j = 0; j < 5; j++){
				for(var i = 0; i < 20; i++){
				EnemyBullet(this.x,this.y,4.5+j*0.3,this.rotation-90+i*1).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,4.5+j*0.3,this.rotation-90-i*1).addChildTo(this.parent);
				}
			}
		}
	},	
	damage: function(num){		//ダメージ処理
		this.hp -=1;
		if(this.hp <= 0){
			for(var i = 0; i < 5; i++){
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90+1).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90-1).addChildTo(this.parent);
				}
			
			this.remove();
			enemies.erase(num);			//敵登録削除
			score.value+=100;	//スコアアップ
			Explosion(this.x,this.y).addChildTo(this.parent);
		}
	}
	
});
// ******************************
//敵クラス******************************
var Enemy002 = tm.createClass({	//クラス定義を行う
	superClass: TriangleShapeEx,	//三角形とする
	init:function(x, y){				//引数2　X座標　Y座標
		this.superInit(30,30,{			//サイズは30で直接指定
			fillStyle:"red"				//塗りつぶし赤
		});
		this.hp 	= 10;				//残りライフ
		this.score	= 100;				//撃破点
		this.setPosition(x,y);			//引数で指定された座標へ設定する
		this.count=0;
		enemies.push(this);				//敵リストに自分を登録する
		this.task(this.main());
	},
	Initalize:function(){},
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){},
	main:function*(){
		this.task(this.attack02());
		while(true){
			var direction =Math.atan2(myship.y - this.y, myship.x - this.x) * Math.RAD_TO_DEG;	//atan2で自機への方角を取得し度数法へ変換
			this.setRotation(direction+90);	//90度加算して方向補正
			yield;
		}
	},
	attack01:function*(){
		while(true){
			yield* this.wait(30);
			for(var i = 0; i < 30; i++){
				for(var j=0;j<5;j++){EnemyBullet(this.x,this.y,6-j/2, 0+j*13+i*7 ).addChildTo(this.parent);}
				yield* this.wait(3);
			}
			yield* this.wait(30);
			for(var i = 0; i < 30; i++){
				for(var j=0;j<5;j++){EnemyBullet(this.x,this.y,6-j/2, 180-(j*13+i*7) ).addChildTo(this.parent);}
				yield* this.wait(3);
			}
		}
	},
	attack02:function*(){
		yield* this.wait(60);
		var ang=12;
		var ang2=13;
		var ang3=ang2;
		var spd=3;
		var count=8;
		var shot_point_x = [+15,+45,-15,-45];
		var shot_point_y = [+30,-30,+30,-30];
		while(count>0){
			for(var i=0;i<4;i++){EnemyBullet(this.x+shot_point_x[i],this.y+shot_point_y[i],spd+Math.rand(1,-1), ang+Math.rand(5,-5) ).addChildTo(this.parent);}
			yield* this.wait(4);
			ang+=ang2;
			if(ang<13)	{ang2=-ang2;spd+=0.65;count--;}
			if(ang>167)	{ang2=-ang2;spd+=0.65;count--;}
		}
		yield* this.wait(30);
		ang=0;
		for(var j=0;j<28;j++){
			for(var i=0;i<4;i++){
				EnemyBullet(this.x+shot_point_x[i],this.y+shot_point_y[i],spd+Math.rand(1,-1), 270+ang+Math.rand(5,-5) ).addChildTo(this.parent);
				EnemyBullet(this.x+shot_point_x[i],this.y+shot_point_y[i],spd+Math.rand(1,-1), 270-ang+Math.rand(5,-5) ).addChildTo(this.parent);
			}
			yield* this.wait(4);
			ang+=ang3/2;
		}

	},
	update: function(app){		//更新時処理
		this.taskrun();
	},	
	damage: function(dmg){		//ダメージ処理
		this.hp -=dmg;
		if(this.hp <= 0){this.final_run(); return true;}else{return false;}
	},
	final_run: function(){
		this.Finalize();
		this.remove();
		enemies.erase(this);		//敵登録削除
		score.value+=this.score;	//スコアアップ
		Explosion(this.x,this.y).addChildTo(this.parent);
	}
});
*/
// ******************************


/*
	変数
	Invincibile			無敵時間 負数は期限なし無敵　0で解除　1以上でフレーム毎に減少
						無敵中は当たり判定自体が存在せずすり抜ける。(判定ある無敵欲しいなら防御率で完全無効にする。)
	DamageRate(配列)	ダメージ率(配列にすることでパーツ毎に異なる防御力を定義できる)
	BeforeX				前フレームのX座標　(現在値との差分比較で移動量などを求める)　初期値：X現在値
	BeforeY				前フレームのY座標　(現在値との差分比較で移動量などを求める)　初期値：Y現在値
	
	関数
	SetInvincibility
		time	無敵時間設定
	VanishEnemy			finish記述等を無視して即時消滅させる
		引数なし
	CollisionA			攻撃オブジェクトに対する接触判定	(不利な接触判定)
		Collision_A_C		円形でCollisionAを設定
			X				円のX座標
			Y				円のY座標
			Size			円のサイズ
			Target			参照するダメージ率
	CollisionB			他オブジェクトに対する接触判定		(有利な接触判定)
		Collision_B_C		円形でCollisionBを設定
			X				円のX座標
			Y				円のY座標
			Size			円のサイズ
			Target			参照するダメージ率
	※判定作成パターン
	全部不可視シェイプ作って判定やらせる
	可視化も容易だし角度のある矩形も利用できる
	
	*/

//敵クラス******************************
var EnemyX = tm.createClass({	//クラス定義を行う
	superClass: TriangleShapeEx,	//三角形とする
	init:function(x, y){				//引数2　X座標　Y座標
		this.InitalizeDefault();		//標準初期化
		this.Initalize();				//ユーザー定義初期化
		this.superInit(30,30,{			//サイズは30で直接指定
			fillStyle:"red"				//塗りつぶし赤
		});
		this.setPosition(x,y);			//引数で指定された座標へ設定する
		
	},
	InitalizeDefault:function(){
		//this.isMaster		= true;		//Slaveではない宣言
		this.hp				= 0;		//残りライフ
		this.score			= 0;		//撃破点
		this.invincibile	= 0;		//無敵時間
		this.checkHierarchy = true;
		enemies.push(this);			//敵リストに自分を登録する
		
		this.Collisions_A =[];
		this.Collisions_B =[];
		this.start=false;
	},
	Initalize:function(){},		//init実行時に行うユーザー定義初期化
	InitalizeA:function(){},	//init実行後の初回ループ時に行う動作
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){},
	update:function(app){ 
		if(!this.start){this.InitalizeA(); this.start=true;}
		if(this.hp <= 0){this.final_run();}	//ダメージによりライフが0以下になった次のフレームで消滅、ライフ0設定の場合最初から現れない
		this.MainLoop(); 
		this.taskrun(); 
		this.hitCollisions_B();
		this.DrawLoop(); }, //更新時処理
	hitCollisions_B:function(){
		//コリジョンBに威力指定することで体当たりダメージ設定可能
		for(var i = 0; i < this.Collisions_B.length; i++){
			this.Collisions_B[i].set_hitposition(this.x,this.y,this.rotation+90);
			if( !myship.muteki && this.Collisions_B[i].isHitElement(myship)){
				myship.damage();
			}
			this.Collisions_B[i].load_position();//判定表示基準の座標に戻す
		}
	},
	damage:function(dmg){		//ダメージ処理
		/*dmgに防御力計算とかいれることで多様性の表現が可能*/
		var b_hp=this.hp;
		var final_hit=false;
		this.hp -=dmg;
		if( b_hp>0 && this.hp<=0 ){final_hit=true;}
		return final_hit;
	},
	final_run: function(){
		this.Finalize();
		this.remove();
		enemies.erase(this);		//敵登録削除
		score.value+=this.score;					//スコアアップ
	}
});
// ******************************
var EnemyX01 = tm.createClass({	//クラス定義を行う
	superClass: EnemyX,
	init:function(x, y){this.superInit(x,y);
		},
	Initalize:function(){
		this.hp=10;
		this.visible =true;
		this.v=false;
		this.ang=0;
		console.log(cm(90));
//		var my = this;



//		this.slave = EnemyX02(0,-100).addChildTo(this.parent);
	},
	InitalizeA:function(){
		//this.width = 0;
		//this.height = 0;

		var num1 = this.Collisions_A.length;
		this.Collisions_A[num1] = HitCircleA(0,0,200,200);
		this.Collisions_A[num1].addChildTo(this);

		var num2 = this.Collisions_B.length;
		this.Collisions_B[num1] = HitCircleB(0,0,100,100);
		this.Collisions_B[num1].addChildTo(this);
	},
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){
		//this.slave.final_run();
		Explosion(this.x,this.y).addChildTo(this.parent);
		//EnemyX02(0,-100).addChildTo(this.parent);
	},
});
// ******************************
var SlaveX01 = tm.createClass({	//クラス定義を行う
	superClass: EnemyX,
	init:function(x, y){this.superInit(x,y);
			},
	Initalize:function(){
		this.hp=1;
		this.visible =true;	
		this.v=false;
		//console.log("0");
	},
	MainLoop:function(){
	//if(!this.v){Explosion(this.x,this.y).addChildTo(this.parent); this.v=true;}
			},
	DrawLoop:function(){},
	Finalize:function(){
		Explosion(this.x,this.y).addChildTo(this.parent);
	},
});
// ******************************


/*
	SlaveはMasterに連動して撃破処理させたい
	SlaveとMasterのライフを独立させると部位破壊の概念が作れる
	Masterから見てSlaveが生きているか
	またSlaveから見てMasterが生きているか参照できるようにする必要がある
	Enemyオブジェクトを記憶してenemiesから探索すればいいのではないか
	slaveA=slave(～～);
	isLive(slaveA) > trueが返る　とか
	AddSlave( slave(～～) ) で記述された敵内のSlaveListに登録されるとか
	
	Slaveがenemiesのカウント数消費するからある意味ペナルティとなる
	Slaveの数も記録しておき、enemies-slaves=mastersとしてカウントする
	*/