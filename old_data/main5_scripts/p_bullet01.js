//�V���b�g******************************
/*
�V���b�g�̂�����ɂ���
�E1�t���[�����ɕ����̑Ώۂɖ������邱�Ƃ��������A�P�̂̑Ώۂ̂ݖ������邱�Ƃ��������ݒ肪�K�v
�����Ώۓ������������e����ꍇ
�@1��ł����������ꍇ�@���������t���O�𗧂Ă�
�@��������͂��̂܂܌p��������
�@���̃t���[���Ł@�O�̃t���[���Ŗ��������t���O�@���m�F���邱�ƂőO�t���[���̖����m�F���ł���
�@�@���t���[���q�b�g�����e���Ȃ��ꍇ�͂��̃t���O�m�F����q�b�g�Ԋu���J���锻����N����
�@HIT�񐔎w��ŏ��ł���ꍇ���t���[���̍Ō��HIT�񐔔�����s�����Ŕ�����N�������Ƃ��ł���

�P�̂̑Ώۂ̂ݖ������邱�Ƃ����e����ꍇ
�@���������ꍇ���������t���O�𗧂ĂāA���̃t���[���ł̖������������������
�@���̃t���[���Ł@�O�̃t���[���Ŗ��������t���O�@���m�F���邱�ƂőO�t���[���̖����m�F���ł���
�@�@���t���[���q�b�g�����e���Ȃ��ꍇ�͂��̃t���O�m�F����q�b�g�Ԋu���J���锻����N����
�@HIT�񐔎w��ŏ��ł���ꍇ���t���[���̍Ō��HIT�񐔔�����s�����Ŕ�����N�������Ƃ��ł���

���������e�̖����������������K�v�Ȃ�Ă���̂��H
������������ɈЗ͂�`���đ��肪�З͂ɉ����đΉ�����΂�����

�q�b�g�Ԋu��e�����K�v�Ȃ�ĂȂ�

�q�b�g���e�񐔂��`���邾���ł���
�����Ȃ��Ȃ�0�ȉ��A��������Ȃ�1�ȏ�
�������񐔂����������A�c��񐔂�0�ɂȂ�����e���I��
0�ȉ��̐ݒ�ɂ���Ă���e�͕��̒l�ɂȂ��0�ɂȂ邱�Ƃ͂Ȃ�

�G��v���C���[�Ɋւ���
�����蔻��������Ă����Ԃł��邩���`����K�v������
���ꂾ���̏�񂪂���Ώ���1�ǉ����邾����OK

*/

//var PlayerShotTemplate = tm.createClass({	//�N���X��`���s��
var MyBullet = tm.createClass({	//�N���X��`���s��
	superClass: CircleShapeEx,
	direction: 0,
	spd: 0,
	padding: 50,
	init:function(x,y,spd,direction){
		this.superInit(10,10,{
			strokeStyle: "transparent",
			fillStyle: "white"
		});
		this.setPosition(x, y);
		this.direction_d=direction;
		this.direction = direction * Math.DEG_TO_RAD;
		this.spd = spd;
		this.life = 1;
		this.atk = 1;
		this.checkHierarchy = true;
		this.Initalize();
	},
	Initalize:function(){},
	MainLoop:function(){},
	DrawLoop:function(){},
	Finalize:function(){},
	move_position:function(){
		this.x += Math.cos(this.direction) * this.spd;
		this.y += Math.sin(this.direction) * this.spd;
	},
	check_hit:function(){
		//�������菈��
		var copied = [].concat(enemies);			//�G�z����R�s�[
		var copied_l = copied.length;
		//var cola_l = 0;
		for(var i = 0; i < copied_l; i++){			//�G�������[�v
			var enemy = copied[i];					//�R�s�[�z�������G���Q��

			//cola_l = enemy.Collisions_A.length;
			
			//�Q�Ƃ����G�̔�e����Q��
			for(var j = 0; j < enemy.Collisions_A.length; j++){
				enemy.Collisions_A[j].set_hitposition(enemy.x,enemy.y,enemy.rotation+90);//����\���Ɣ�����W�̍��ٕ␳
				if(this.isHitElement(enemy.Collisions_A[j])){
					/* �����蔻��ɖh��͂̒�`�t����΃_���[�W�ʒ����\ */
					var kill=enemy.damage(this.atk);	//�G�_���[�W����
					console.log(kill);
					if(kill){i--; copied_l--;}			//�G��|������z��T�[�`����
					this.life--;						//�e���C�t����
					if(this.life==0)					//���C�t0�Ȃ�V���b�g�폜
					{this.final_run();}
				}
				enemy.Collisions_A[j].load_position();//����\����̍��W�ɖ߂�
				
			}
		}
	},
	check_paddingout:function(){
		if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y)
		{this.remove();}//��ʊO���ŏ���
	},
	update: function(){
		this.move_position();
		this.check_hit();
		this.check_paddingout();
		this.taskrun();
	},
	final_run:function(){
	this.Finalize();
	this.remove();
	}
});
// ******************************
/*
var MyBullet = tm.createClass({	//�N���X��`���s��
	superClass: CircleShapeEx,
	direction: 0,
	spd: 0,
	padding: 50,
	init:function(x,y,spd,direction){
		this.superInit(10,10,{
			strokeStyle: "transparent",
			fillStyle: "white"
		});
		this.setPosition(x, y);
		this.direction_d=direction;
		this.direction = direction * Math.DEG_TO_RAD;
		this.spd = spd;
		this.task(this.main());
	},
	main:function*(){
		this.task(this.action01());
		while(true){
			this.x += Math.cos(this.direction) * this.spd;
			this.y += Math.sin(this.direction) * this.spd;
			
			//�������菈��
			var copied = [].concat(enemies);		//�G�z����R�s�[
			for(var i = 0; i < copied.length; i++){	//�G�������[�v
				var enemy = copied[i];				//�R�s�[�z�������G���Q��
				if(this.isHitElement(enemy)){		//��������
					this.remove();					//�V���b�g�폜
					enemy.damage(enemy);			//�G�_���[�W����
				}
			}

		if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y){
			this.remove();
		}//��ʊO���ŏ���

			yield;
		}
	},
	action01:function*(){
		var ang=0;
		while(true){
			yield* this.wait(1);
			MyBullet02(this.x,this.y,16,this.direction_d+90+ang).addChildTo(this.parent);
			ang-=15;
//			MyBullet02(this.x,this.y,16,this.direction_d-90).addChildTo(this.parent);
		}
	},
	update: function(){
		this.taskrun();
	}
});
*/
// ******************************
var MyBullet02 = tm.createClass({	//�N���X��`���s��
	superClass: CircleShapeEx,
	direction: 0,
	spd: 0,
	padding: 50,
	init:function(x,y,spd,direction){
		this.superInit(10,10,{
			strokeStyle: "transparent",
			fillStyle: "white"
		});
		this.setPosition(x, y);
		this.direction = direction * Math.DEG_TO_RAD;
		this.spd = spd;
		this.task(this.main());
	},
	main:function*(){
		while(true){
			this.x += Math.cos(this.direction) * this.spd;
			this.y += Math.sin(this.direction) * this.spd;
			
			//�������菈��
			var copied = [].concat(enemies);		//�G�z����R�s�[
			for(var i = 0; i < copied.length; i++){	//�G�������[�v
				var enemy = copied[i];				//�R�s�[�z�������G���Q��
				if(this.isHitElement(enemy)){		//��������
					this.remove();					//�V���b�g�폜
					enemy.damage(enemy);			//�G�_���[�W����
				}
			}
			if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y){
				this.remove();
			}//��ʊO���ŏ���
			yield;
		}
	},
	update: function(){
		this.taskrun();
	}
});
// ******************************