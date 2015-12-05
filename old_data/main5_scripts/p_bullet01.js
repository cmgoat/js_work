//ショット******************************
/*
ショットのあり方について
・1フレーム内に複数の対象に命中することを許すか、単体の対象のみ命中することを許すか設定が必要
複数対象同時命中を許容する場合
　1回でも命中した場合　命中したフラグを立てる
　命中判定はそのまま継続させる
　次のフレームで　前のフレームで命中したフラグ　を確認することで前フレームの命中確認ができる
　　毎フレームヒットを許容しない場合はそのフラグ確認からヒット間隔を開ける判定を起こす
　HIT回数指定で消滅する場合もフレームの最後でHIT回数判定を行い消滅判定を起こすことができる

単体の対象のみ命中することを許容する場合
　命中した場合命中したフラグを立てて、このフレームでの命中判定を消失させる
　次のフレームで　前のフレームで命中したフラグ　を確認することで前フレームの命中確認ができる
　　毎フレームヒットを許容しない場合はそのフラグ確認からヒット間隔を開ける判定を起こす
　HIT回数指定で消滅する場合もフレームの最後でHIT回数判定を行い消滅判定を起こすことができる

そもそも弾の命中判定消失させる必要なんてあるのか？
命中した相手に威力を伝えて相手が威力に応じて対応すればいいんだ

ヒット間隔を弾が持つ必要なんてない

ヒット許容回数を定義するだけでいい
制限なしなら0以下、制限ありなら1以上
命中時回数を減少させ、残り回数が0になったら弾が終了
0以下の設定にされている弾は負の値になる為0になることはない

敵やプレイヤーに関して
当たり判定を持っている状態であるかを定義する必要がある
それだけの情報があれば条件1個追加するだけでOK

*/

//var PlayerShotTemplate = tm.createClass({	//クラス定義を行う
var MyBullet = tm.createClass({	//クラス定義を行う
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
		//命中判定処理
		var copied = [].concat(enemies);			//敵配列をコピー
		var copied_l = copied.length;
		//var cola_l = 0;
		for(var i = 0; i < copied_l; i++){			//敵数分ループ
			var enemy = copied[i];					//コピー配列内から敵を参照

			//cola_l = enemy.Collisions_A.length;
			
			//参照した敵の被弾判定参照
			for(var j = 0; j < enemy.Collisions_A.length; j++){
				enemy.Collisions_A[j].set_hitposition(enemy.x,enemy.y,enemy.rotation+90);//判定表示と判定座標の差異補正
				if(this.isHitElement(enemy.Collisions_A[j])){
					/* 当たり判定に防御力の定義付ければダメージ量調整可能 */
					var kill=enemy.damage(this.atk);	//敵ダメージ処理
					console.log(kill);
					if(kill){i--; copied_l--;}			//敵を倒したら配列サーチ調整
					this.life--;						//弾ライフ減少
					if(this.life==0)					//ライフ0ならショット削除
					{this.final_run();}
				}
				enemy.Collisions_A[j].load_position();//判定表示基準の座標に戻す
				
			}
		}
	},
	check_paddingout:function(){
		if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y)
		{this.remove();}//画面外消滅処理
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
var MyBullet = tm.createClass({	//クラス定義を行う
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
			
			//命中判定処理
			var copied = [].concat(enemies);		//敵配列をコピー
			for(var i = 0; i < copied.length; i++){	//敵数分ループ
				var enemy = copied[i];				//コピー配列内から敵を参照
				if(this.isHitElement(enemy)){		//命中判定
					this.remove();					//ショット削除
					enemy.damage(enemy);			//敵ダメージ処理
				}
			}

		if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y){
			this.remove();
		}//画面外消滅処理

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
var MyBullet02 = tm.createClass({	//クラス定義を行う
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
			
			//命中判定処理
			var copied = [].concat(enemies);		//敵配列をコピー
			for(var i = 0; i < copied.length; i++){	//敵数分ループ
				var enemy = copied[i];				//コピー配列内から敵を参照
				if(this.isHitElement(enemy)){		//命中判定
					this.remove();					//ショット削除
					enemy.damage(enemy);			//敵ダメージ処理
				}
			}
			if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y){
				this.remove();
			}//画面外消滅処理
			yield;
		}
	},
	update: function(){
		this.taskrun();
	}
});
// ******************************