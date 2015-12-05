// 敵ショット******************************
var EnemyBullet = tm.createClass({	//クラス定義を行う
	superClass: tm.app.CircleShape,
	direction: 0,
	spd: 0,
	padding: 50,
	init:function(x, y,spd, direction){
		this.superInit(10,10,{
			strokeStyle: "transparent",
			fillStyle: "red"
		});
		this.radius = 2.5;		//当たり判定
		this.setPosition(x, y);
		this.direction = direction * Math.DEG_TO_RAD;
		this.spd = spd;
	},
	update: function(){
		this.x += Math.cos(this.direction) * this.spd;
		this.y += Math.sin(this.direction) * this.spd;
		
		if(this.x < -this.padding || SCREEN_WIDTH+this.padding < this.x || this.y < -this.padding || SCREEN_HEIGHT+this.padding < this.y){
			this.remove();
		}
		
		if( !myship.muteki && this.isHitElement(myship)){
			myship.damage();
			this.remove();
		}
	}
});
// ******************************