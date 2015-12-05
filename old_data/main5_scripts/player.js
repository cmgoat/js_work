//�v���C���[�N���X******************************
var Player = tm.createClass({	//�N���X��`���s��
	superClass: tm.app.TriangleShape,	//�O�p�`�Ƃ���@�����̂����摜�ŕ`�悷��̂ŕs�v�ɂȂ�
	padding: 10,						//��ʊO�E�o�h�~�p�p�f�B���O
	init:function(){					//���ɌĂяo�������͍��Ȃ�
		this.superInit(30,30,{ fillStyle:"blue" });	//�T�C�Y��30�@�h��Ԃ���
		this.radius	= 1.5;				//�����蔻��
		this.hp 	= 910;				//�c�胉�C�t
		this.muteki	= false;			//���G����F�Ȃ�
		this.x		= SCREEN_WIDTH * 0.5;	//X���^��
		this.y		= SCREEN_HEIGHT * 0.9;	//Y��������1���̈ʒu
		this.spd1	= 5;				//
		this.spd2	= 30;				//
		this.spd	= this.spd1;		//
		this.chVal	= 0;
		this.chCost	= 1000;
		this.chSpd	= 10;
		this.shotCt	= 0;
		this.prechLv= 0;
	},
	update: function(app){	//���t���[���X�V����
		
		//�u�[�X�g
		if(app.keyboard.getKeyDown("shift")){
		if(this.spd === this.spd1){this.spd =this.spd2;Explosion(this.x,this.y).addChildTo(this.parent);}
		}
		if(this.spd > this.spd1){
			this.spd -=2.5;
			if(this.spd < this.spd1){this.spd=this.spd1;}
		}
		
		//�ړ�����
		if		(app.keyboard.getKey("left"))	{this.x -=this.spd;}
		else if	(app.keyboard.getKey("right"))	{this.x +=this.spd;}
		if		(app.keyboard.getKey("up"))		{this.y -=this.spd;}
		else if	(app.keyboard.getKey("down"))	{this.y +=this.spd;}
		
		//�ړ��␳����	�p�f�B���O�G���A�O������֕␳����
		if		(this.x<0+this.padding)				{this.x=this.padding;}
		else if	(this.x>SCREEN_WIDTH-this.padding)		{this.x=SCREEN_WIDTH-this.padding}
		if		(this.y<0+this.padding)				{this.y=this.padding;}
		else if	(this.y>SCREEN_HEIGHT-this.padding)	{this.y=SCREEN_HEIGHT-this.padding}
		
		//���G��ԕ\��
		if(this.muteki){this.alpha = (app.frame/2) % 2 ===0 ? 1 : 0;}	//���G��ԂȂ�t���[�����ɓ_��
		else{this.alpha = 1;}										//�ʏ��ԂȂ畁�ʂɕ`��
		
		//�V���b�g  Math.floor(num)
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