//シェイプ拡張******************************
/*
var tasklist = [];
function task(f){tasklist[tasklist.length]=f;}
function taskrun(){for(var k=0;k<tasklist.length;k++){if(tasklist[k].next().done){tasklist.splice(k,1);k--;}}}

*/

//******************************
var TriangleShapeEx=tm.createClass({
	superClass:tm.app.TriangleShape,
	init:function(scale_x, scale_y,style){
		this.superInit(scale_x,scale_y,style);
		this.tasklist = [];
	},
	task:function(f){this.tasklist[this.tasklist.length]=f;},
	taskrun:function(){for(var k=0;k<this.tasklist.length;k++){if(this.tasklist[k].next().done){this.tasklist.splice(k,1);k--;}}},
	wait:function*(n){for(var i=0;i<n;i++){yield;}}
});
//******************************
var CircleShapeEx=tm.createClass({
	superClass: tm.app.CircleShape,
	init:function(scale_x, scale_y,style){
		this.superInit(scale_x,scale_y,style);
		this.tasklist = [];
	},
	task:function(f){this.tasklist[this.tasklist.length]=f;},
	taskrun:function(){for(var k=0;k<this.tasklist.length;k++){if(this.tasklist[k].next().done){this.tasklist.splice(k,1);k--;}}},
	wait:function*(n){for(var i=0;i<n;i++){yield;}}
});
//******************************