
// ����******************************
var Explosion = tm.createClass({	//�N���X��`���s��
	superClass: tm.app.CircleShape,
	init:function(x, y){
		this.superInit(200,200,{
			fillStyle: "transparent",
			strokeStyle: "white"
		});
		this.setPosition(x, y);
		this.setScale(0.2);
		this.tweener.to({
			scaleX: 1,
			scaleY: 1,
			alpha:	0
		},500,"easeOutQuad")
		.call(function() {
			this.remove();
		}.bind(this));
	}
	
});
// ******************************


// �����F�w��******************************
var ExplosionC = tm.createClass({	//�N���X��`���s��
	superClass: tm.app.CircleShape,
	init:function(x, y, c_str){
		this.superInit(200,200,{
			fillStyle: "transparent",
			strokeStyle: c_str
		});
		this.setPosition(x, y);
		this.setScale(0.2);
		this.tweener.to({
			scaleX: 1,
			scaleY: 1,
			alpha:	0
		},500,"easeOutQuad")
		.call(function() {
			this.remove();
		}.bind(this));
	}
	
});
// ******************************