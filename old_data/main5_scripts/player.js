//プレイヤークラス******************************
var Player = tm.createClass({	//クラス定義を行う
	superClass: tm.app.TriangleShape,	//三角形とする　※そのうち画像で描画するので不要になる
	padding: 10,						//画面外脱出防止用パディング
	init:function(){					//特に呼び出し引数は作らない
		this.superInit(30,30,{ fillStyle:"blue" });	//サイズは30　塗りつぶし青
		this.radius	= 1.5;				//当たり判定
		this.hp 	= 910;				//残りライフ
		this.muteki	= false;			//無敵判定：なし
		this.x		= SCREEN_WIDTH * 0.5;	//X軸真ん中
		this.y		= SCREEN_HEIGHT * 0.9;	//Y軸下から1割の位置
		this.spd1	= 5;				//
		this.spd2	= 30;				//
		this.spd	= this.spd1;		//
		this.chVal	= 0;
		this.chCost	= 1000;
		this.chSpd	= 10;
		this.shotCt	= 0;
		this.prechLv= 0;
	},
	update: function(app){	//毎フレーム更新処理
		
		//ブースト
		if(app.keyboard.getKeyDown("shift")){
		if(this.spd === this.spd1){this.spd =this.spd2;Explosion(this.x,this.y).addChildTo(this.parent);}
		}
		if(this.spd > this.spd1){
			this.spd -=2.5;
			if(this.spd < this.spd1){this.spd=this.spd1;}
		}
		
		//移動処理
		if		(app.keyboard.getKey("left"))	{this.x -=this.spd;}
		else if	(app.keyboard.getKey("right"))	{this.x +=this.spd;}
		if		(app.keyboard.getKey("up"))		{this.y -=this.spd;}
		else if	(app.keyboard.getKey("down"))	{this.y +=this.spd;}
		
		//移動補正処理	パディングエリア外を内部へ補正する
		if		(this.x<0+this.padding)				{this.x=this.padding;}
		else if	(this.x>SCREEN_WIDTH-this.padding)		{this.x=SCREEN_WIDTH-this.padding}
		if		(this.y<0+this.padding)				{this.y=this.padding;}
		else if	(this.y>SCREEN_HEIGHT-this.padding)	{this.y=SCREEN_HEIGHT-this.padding}
		
		//無敵状態表現
		if(this.muteki){this.alpha = (app.frame/2) % 2 ===0 ? 1 : 0;}	//無敵状態ならフレーム毎に点滅
		else{this.alpha = 1;}										//通常状態なら普通に描画
		
		//ショット  Math.floor(num)
		if(this.shotCt ===0){
			var _chLv = Math.floor(this.chVal / this.chCost);
			if(app.keyboard.getKey("z")){
				switch( _chLv ){
				case 0:
					MyBullet(this.x+10,this.y-20,16,270).addChildTo(this.parent);
				//	MyBullet(this.x-10,this.y-20,16,270).addChildTo(this.parent);
				//	MyBullet(this.x+15,this.y-20,16,270+5).addChildTo(this.parent);
				//	MyBullet(this.x-15,this.y-20,16,270-5).addChildTo(this.parent);
					this.shotCt = 8;
					this.chVal=0;
				break;
				case 1:
				case 2:
				case 3:
				case 4:
					var w_ang=[0,20,40,60,80];
					var w_num=[0,10,20,30,40];
					for(var i = 0; i < w_num[_chLv]; i++){MyBullet(this.x,this.y-20,24,270-w_ang[_chLv]/2+w_ang[_chLv]/w_num[_chLv]*i).addChildTo(this.parent);}
					this.shotCt = 30+(_chLv - 1)*10 ;
					this.chVal=0;
				break;
				}
			}
			
			
			if(app.keyboard.getKeyDown("x")){
				if(_chLv > 0){
					var w_ang=10;
					var w_num=20;
					this.chVal=0;
					for(var j = 1; j < 4; j++){
						for(var i = 0; i < w_num; i++){
							MyBullet(this.x+30,this.y,24+j*0.5,0-w_ang/2+w_ang/w_num*i).addChildTo(this.parent);
							MyBullet(this.x-30,this.y,24+j*0.5,180-w_ang/2+w_ang/w_num*i).addChildTo(this.parent);
						}
					}
				}
			}
		}
		
	if(this.shotCt === 0 && this.chCost*4 > this.chVal ){
		//this.chVal+=this.chSpd+(5-this.hp);
		if( this.chCost > this.chVal ){this.chVal+=this.chSpd*2;}
	}
	
	if( this.chVal > this.chCost*4){ this.chVal = this.chCost*4;}
	
	if(Math.floor((this.chVal) / this.chCost) > this.prechLv ){
	var exc=["#40FFFF","#FF8000","#FF4000","#FF0000"];
	ExplosionC(this.x,this.y,exc[Math.floor((this.chVal+this.chSpd)/this.chCost)-1]).addChildTo(this.parent);
	}
	this.prechLv =Math.floor(this.chVal / this.chCost);
	
	if(this.shotCt>0){this.shotCt--;}
	
	life.value = this.hp;
	},
	damage: function(app){
		this.hp -=1;
		this.chVal+=this.chCost*1;
		if(this.hp < 0 && -1 <= this.hp){
			this.remove();
			Explosion(this.x,this.y).addChildTo(this.parent);
		}else{
			this.muteki = true;
			this.tweener.clear().wait(1000).call(function() {
				this.muteki = false;
			}.bind(this));
		}
	}
});
//******************************