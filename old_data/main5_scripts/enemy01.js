//�G�N���X******************************
/*
var Enemy001 = tm.createClass({	//�N���X��`���s��
	superClass: tm.app.TriangleShape,	//�O�p�`�Ƃ���
	init:function(x, y){				//����2�@X���W�@Y���W
		this.superInit(30,30,{			//�T�C�Y��30�Œ��ڎw��
			fillStyle:"red"				//�h��Ԃ���
		});
		this.hp 	= 1;				//�c�胉�C�t
		this.setPosition(x,y);			//�����Ŏw�肳�ꂽ���W�֐ݒ肷��
		enemies.push(this);				//�G���X�g�Ɏ�����o�^����

	},
	update: function(app){		//�X�V������
		
		//�U������
		var direction =Math.atan2(myship.y - this.y, myship.x - this.x) * Math.RAD_TO_DEG;	//atan2�Ŏ��@�ւ̕��p���擾���x���@�֕ϊ�
		this.setRotation(direction+90);	//90�x���Z���ĕ����␳
		
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
	damage: function(num){		//�_���[�W����
		this.hp -=1;
		if(this.hp <= 0){
			for(var i = 0; i < 5; i++){
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90+1).addChildTo(this.parent);
				EnemyBullet(this.x,this.y,9-i*0.5,this.rotation-90-1).addChildTo(this.parent);
				}
			
			this.remove();
			enemies.erase(num);			//�G�o�^�폜
			score.value+=100;	//�X�R�A�A�b�v
			Explosion(this.x,this.y).addChildTo(this.parent);
		}
	}
	
});
// ******************************
//�G�N���X******************************
var Enemy002 = tm.createClass({	//�N���X��`���s��
	superClass: TriangleShapeEx,	//�O�p�`�Ƃ���
	init:function(x, y){				//����2�@X���W�@Y���W
		this.superInit(30,30,{			//�T�C�Y��30�Œ��ڎw��
			fillStyle:"red"				//�h��Ԃ���
		});
		this.hp 	= 10;				//�c�胉�C�t
		this.score	= 100;				//���j�_
		this.setPosition(x,y);			//�����Ŏw�肳�ꂽ���W�֐ݒ肷��
		this.count=0;
		enemies.push(this);				//�G���X�g�Ɏ�����o�^����
		this.task(this.main());
	},
	Initalize:function(){},
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){},
	main:function*(){
		this.task(this.attack02());
		while(true){
			var direction =Math.atan2(myship.y - this.y, myship.x - this.x) * Math.RAD_TO_DEG;	//atan2�Ŏ��@�ւ̕��p���擾���x���@�֕ϊ�
			this.setRotation(direction+90);	//90�x���Z���ĕ����␳
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
	update: function(app){		//�X�V������
		this.taskrun();
	},	
	damage: function(dmg){		//�_���[�W����
		this.hp -=dmg;
		if(this.hp <= 0){this.final_run(); return true;}else{return false;}
	},
	final_run: function(){
		this.Finalize();
		this.remove();
		enemies.erase(this);		//�G�o�^�폜
		score.value+=this.score;	//�X�R�A�A�b�v
		Explosion(this.x,this.y).addChildTo(this.parent);
	}
});
*/
// ******************************


/*
	�ϐ�
	Invincibile			���G���� �����͊����Ȃ����G�@0�ŉ����@1�ȏ�Ńt���[�����Ɍ���
						���G���͓����蔻�莩�̂����݂������蔲����B(���肠�閳�G�~�����Ȃ�h�䗦�Ŋ��S�����ɂ���B)
	DamageRate(�z��)	�_���[�W��(�z��ɂ��邱�ƂŃp�[�c���ɈقȂ�h��͂��`�ł���)
	BeforeX				�O�t���[����X���W�@(���ݒl�Ƃ̍�����r�ňړ��ʂȂǂ����߂�)�@�����l�FX���ݒl
	BeforeY				�O�t���[����Y���W�@(���ݒl�Ƃ̍�����r�ňړ��ʂȂǂ����߂�)�@�����l�FY���ݒl
	
	�֐�
	SetInvincibility
		time	���G���Ԑݒ�
	VanishEnemy			finish�L�q���𖳎����đ������ł�����
		�����Ȃ�
	CollisionA			�U���I�u�W�F�N�g�ɑ΂���ڐG����	(�s���ȐڐG����)
		Collision_A_C		�~�`��CollisionA��ݒ�
			X				�~��X���W
			Y				�~��Y���W
			Size			�~�̃T�C�Y
			Target			�Q�Ƃ���_���[�W��
	CollisionB			���I�u�W�F�N�g�ɑ΂���ڐG����		(�L���ȐڐG����)
		Collision_B_C		�~�`��CollisionB��ݒ�
			X				�~��X���W
			Y				�~��Y���W
			Size			�~�̃T�C�Y
			Target			�Q�Ƃ���_���[�W��
	������쐬�p�^�[��
	�S���s���V�F�C�v����Ĕ����点��
	�������e�Ղ����p�x�̂����`�����p�ł���
	
	*/

//�G�N���X******************************
var EnemyX = tm.createClass({	//�N���X��`���s��
	superClass: TriangleShapeEx,	//�O�p�`�Ƃ���
	init:function(x, y){				//����2�@X���W�@Y���W
		this.InitalizeDefault();		//�W��������
		this.Initalize();				//���[�U�[��`������
		this.superInit(30,30,{			//�T�C�Y��30�Œ��ڎw��
			fillStyle:"red"				//�h��Ԃ���
		});
		this.setPosition(x,y);			//�����Ŏw�肳�ꂽ���W�֐ݒ肷��
		
	},
	InitalizeDefault:function(){
		//this.isMaster		= true;		//Slave�ł͂Ȃ��錾
		this.hp				= 0;		//�c�胉�C�t
		this.score			= 0;		//���j�_
		this.invincibile	= 0;		//���G����
		this.checkHierarchy = true;
		enemies.push(this);			//�G���X�g�Ɏ�����o�^����
		
		this.Collisions_A =[];
		this.Collisions_B =[];
		this.start=false;
	},
	Initalize:function(){},		//init���s���ɍs�����[�U�[��`������
	InitalizeA:function(){},	//init���s��̏��񃋁[�v���ɍs������
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){},
	update:function(app){ 
		if(!this.start){this.InitalizeA(); this.start=true;}
		if(this.hp <= 0){this.final_run();}	//�_���[�W�ɂ�胉�C�t��0�ȉ��ɂȂ������̃t���[���ŏ��ŁA���C�t0�ݒ�̏ꍇ�ŏ����猻��Ȃ�
		this.MainLoop(); 
		this.taskrun(); 
		this.hitCollisions_B();
		this.DrawLoop(); }, //�X�V������
	hitCollisions_B:function(){
		//�R���W����B�ɈЗ͎w�肷�邱�Ƃő̓�����_���[�W�ݒ�\
		for(var i = 0; i < this.Collisions_B.length; i++){
			this.Collisions_B[i].set_hitposition(this.x,this.y,this.rotation+90);
			if( !myship.muteki && this.Collisions_B[i].isHitElement(myship)){
				myship.damage();
			}
			this.Collisions_B[i].load_position();//����\����̍��W�ɖ߂�
		}
	},
	damage:function(dmg){		//�_���[�W����
		/*dmg�ɖh��͌v�Z�Ƃ�����邱�Ƃő��l���̕\�����\*/
		var b_hp=this.hp;
		var final_hit=false;
		this.hp -=dmg;
		if( b_hp>0 && this.hp<=0 ){final_hit=true;}
		return final_hit;
	},
	final_run: function(){
		this.Finalize();
		this.remove();
		enemies.erase(this);		//�G�o�^�폜
		score.value+=this.score;					//�X�R�A�A�b�v
	}
});
// ******************************
var EnemyX01 = tm.createClass({	//�N���X��`���s��
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
var SlaveX01 = tm.createClass({	//�N���X��`���s��
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
	Slave��Master�ɘA�����Č��j������������
	Slave��Master�̃��C�t��Ɨ�������ƕ��ʔj��̊T�O������
	Master���猩��Slave�������Ă��邩
	�܂�Slave���猩��Master�������Ă��邩�Q�Ƃł���悤�ɂ���K�v������
	Enemy�I�u�W�F�N�g���L������enemies����T������΂����̂ł͂Ȃ���
	slaveA=slave(�`�`);
	isLive(slaveA) > true���Ԃ�@�Ƃ�
	AddSlave( slave(�`�`) ) �ŋL�q���ꂽ�G����SlaveList�ɓo�^�����Ƃ�
	
	Slave��enemies�̃J�E���g������邩�炠��Ӗ��y�i���e�B�ƂȂ�
	Slave�̐����L�^���Ă����Aenemies-slaves=masters�Ƃ��ăJ�E���g����
	*/