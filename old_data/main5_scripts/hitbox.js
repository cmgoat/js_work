var HitCircleA = tm.createClass({	//�N���X��`���s��
	superClass: tm.app.CircleShape,	//�~�Ƃ���@
	init:function( x, y, size_x, size_y){				//����2�@X���W�@Y���W
		this.superInit({			//�T�C�Y��30�Œ��ڎw��
			x:x,
			y:y,
			height:size_y,
			width:size_x,
			fillStyle:"white",
			alpha:0.1,
			visible:true
		});
	this.bx=x;
	this.by=y;
	this.bd=0;
	this.vl=CM_GetGapLength(0,0,x,y);
	this.va=CM_GetGapAngle(0,0,x,y);
	},
	update:function(app){
		if( this.bx!=this.x || this.by!=this.y){
			this.vl=CM_GetGapLength(0,0,this.x,this.y);
			this.va=CM_GetGapAngle(0,0,this.x,this.y);
		}
		this.bx=this.x;
		this.by=this.y;
		this.bd=this.rotation;
	},
	save_position:function(){
		this.rx = this.x;
		this.ry = this.y;
		this.rd = this.rotation;
	},
	load_position:function(){
		this.x = this.rx;
		this.y = this.ry;
		this.rotation = this.rd;
	},
	set_hitposition:function(ox,oy,od){
		this.save_position();
		this.x = ox+CM_GetGapX(0,this.vl,od);
		this.y = oy+CM_GetGapY(0,this.vl,od);
		this.rotation = od+this.rotation;
	}
});

var HitCircleB = tm.createClass({	//�N���X��`���s��
	superClass:HitCircleA,
	init:function( x, y, size_x, size_y){				//����2�@X���W�@Y���W
		this.superInit( x, y, size_x, size_y);
		this.fillStyle="red";
	}
});