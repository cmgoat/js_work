

// ******************************
var Particle = tm.createClass({
	superClass: tm.app.Sprite,
	padding: 100,
	t:0,
	init: function(x, y, pat) {
		this.superInit(PARTICLE_IMAGES[pat],50, 50);
		this.position.set(x, y);
		this.blendMode = PARTICLE_COLORS[pat].blend;
	},
	update:		function() {
		if(this.alpha_a	!= undefined){ this.alpha += this.alpha_a; if(this.alpha>1){this.alpha=1;}else if(this.alpha<0){this.alpha=0;} }
		if(this.spd_a	!= undefined && (this.spd_at>this.t	||this.spd_at==undefined)){ 
			this.spd += this.spd_a;
			if(this.spd_m==undefined){
				if(this.spd_m>this.spd_f && this.spd_m<this.spd ){this.spd=this.spd_m}
				if(this.spd_m<this.spd_f && this.spd_m>this.spd ){this.spd=this.spd_m}
			}
		}
		if(this.ang_a	!= undefined && (this.ang_at>this.t		||this.ang_at==undefined))		{ this.ang += this.ang_a; }
		if(this.scale_a	!= undefined && (this.scale_at>this.t	||this.scale_at==undefined))	{ this.scaleX += this.scale_a; this.scaleY += this.scale_a; }
		if(this.keep	== undefined){
			if(this.x<-this.padding || SCREEN_WIDTH+this.padding<this.x || this.y<-this.padding || SCREEN_HEIGHT+this.padding<this.y ){this.remove(); }
		}
		else if(this.keep<=this.t){this.remove(); }
		if(this.ang		!= undefined){this.angr=this.ang * Math.DEG_TO_RAD}
		if(this.spd		!= undefined){this.x += Math.cos(this.angr) * this.spd; this.y += Math.sin(this.angr) * this.spd;}
		this.t++;
	},
	setAlpha:	function(e) {this.alpha		= e;},
	setAlpha_a:	function(e) {this.alpha_a	= e;},
	setSpd:		function(e) {this.spd		= e; this.spd_f	= e;},
	setSpd_a:	function(e) {this.spd_a		= e; if(this.spd==undefined){this.spd==0;}},
	setSpd_at:	function(e) {this.spd_at	= e;},
	setSpd_m:	function(e) {this.spd_m		= e;},
	setAngle:	function(e) {this.ang		= e;},
	setAngle_a:	function(e) {this.ang_a		= e; if(this.ang==undefined){this.ang==0;}},
	setAngle_at:function(e) {this.ang_at	= e;},
	setScale:	function(e) {this.scaleX = e;this.scaleY = e;},
	setScale_a:	function(e) {this.scale_a	= e;},
	setScale_at:function(e) {this.scale_at	= e;},
	setKeep:	function(e) {this.keep		= e;},
});



// ******************************
var PARTICLE_IMAGES = PARTICLE_IMAGES = [];
var PARTICLE_COLORS = PARTICLE_COLORS = [
	{color1 : "rgba(255, 32, 32,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//0　加　赤
	{color1 : "rgba( 32,255, 32,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//1　加　緑
	{color1 : "rgba( 32, 32,255,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//2　加　青
	{color1 : "rgba(255, 32,255,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//3　加　マゼンタ
	{color1 : "rgba(255,255, 32,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//4　加　イエロー
	{color1 : "rgba( 32,255,255,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//5　加　シアン
	{color1 : "rgba(255,128, 32,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//6　加　オレンジ
	{color1 : "rgba( 32,255,128,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//7　加　エメラルドグリーン
	{color1 : "rgba(128, 32,255,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//8　加　パープル
	{color1 : "rgba(255,255,255,1)",color2 : "rgba(  0,  0,  0,1)",blend : "lighter"},		//9　加　ホワイト
	{color1 : "rgba(255, 32, 32,1)",color2 : "rgba(255, 32, 32,0)",blend : "source-over"},	//10 α　赤
	{color1 : "rgba( 32,255, 32,1)",color2 : "rgba( 32,255, 32,0)",blend : "source-over"},	//11 α　緑
	{color1 : "rgba( 32, 32,255,1)",color2 : "rgba( 32, 32,255,0)",blend : "source-over"},	//12 α　青
	{color1 : "rgba(255, 32,255,1)",color2 : "rgba(255, 32,255,0)",blend : "source-over"},	//13 α　マゼンタ
	{color1 : "rgba(255,255, 32,1)",color2 : "rgba(255,255, 32,0)",blend : "source-over"},	//14 α　イエロー
	{color1 : "rgba( 32,255,255,1)",color2 : "rgba( 32,255,255,0)",blend : "source-over"},	//15 α　シアン
	{color1 : "rgba(255,128, 32,1)",color2 : "rgba(255,128, 32,0)",blend : "source-over"},	//16 α　オレンジ
	{color1 : "rgba( 32,255,128,1)",color2 : "rgba( 32,255,128,0)",blend : "source-over"},	//17 α　エメラルドグリーン
	{color1 : "rgba(128, 32,255,1)",color2 : "rgba(128, 32,255,0)",blend : "source-over"},	//18 α　パープル
	{color1 : "rgba(255,255,255,1)",color2 : "rgba(255,255,255,0)",blend : "source-over"},	//19 α　ホワイト
	{color1 : "rgba(128,128,128,1)",color2 : "rgba(128,128,128,0)",blend : "source-over"},	//20 α　グレー
	{color1 : "rgba(  0,  0,  0,1)",color2 : "rgba(  0,  0,  0,0)",blend : "source-over"}	//21 α　ブラック
];
//パーティクル画像生成
//tm.preload(function() {
function LoadParticle() {
	for (var i in PARTICLE_COLORS){
		var c = tm.graphics.Canvas();
		c.resize(50, 50);
		c.setTransformCenter();
		var radialGradient = tm.graphics.RadialGradient(0, 0, 0, 0, 0, 16);
		radialGradient.addColorStopList([
			{ offset: 0.0, color: PARTICLE_COLORS[i].color1},
			{ offset: 1.0, color: PARTICLE_COLORS[i].color2}
		]);
		c.fillStyle = radialGradient.toStyle();
		c.fillCircle(0, 0, 20);
		PARTICLE_IMAGES.push(c);
	}
}
// ******************************
