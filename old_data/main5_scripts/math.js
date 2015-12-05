var cm=function(x){return x;}

//------------------------------------------------------------------------------
//	ラジアン角度からディグリー角度を取得する
//	CM_RadToDeg(rad)
var CM_RadToDeg=function (
	rad	// ラジアン角度
){return rad*180/Math.PI}
//------------------------------------------------------------------------------
//	ディグリー角度からラジアン角度を取得する
//	CM_DegToRad(deg)
var CM_DegToRad=function (
	deg	// ラジアン角度
){return deg*Math.PI/180}
//------------------------------------------------------------------------------
//	2点間の距離を取得する
//	CM_GetGapLength(xA,yA,xB,yB)
var CM_GetGapLength=function (
	xA,	// 点Aのx座標
	yA,	// 点Aのy座標
	xB,	// 点Bのx座標
	yB	// 点Bのy座標
){return((xB-xA)^2+(yB-yA)^2)^0.5;}
//------------------------------------------------------------------------------
//	点Aから点Bへのディグリー角度を取得する
//	CM_GetGapAngle(xA,yA,xB,yB)
var CM_GetGapAngle=function (
	xA,	// 点Aのx座標
	yA,	// 点Aのy座標
	xB,	// 点Bのx座標
	yB	// 点Bのy座標
){return CM_RadToDeg(Math.atan2(yB-yA,xB-xA));}
//------------------------------------------------------------------------------
//	点Aからある距離、ディグリー角度にある点Bのx座標を取得する
//	CM_GetGapX(xA,gapLength,gapDegreeAngle)
var CM_GetGapX=function (
	xA,				// 点Aのx座標
	gapLength,		// 点Bまでの距離
	gapDegreeAngle	// 点Bへの絶対角度
){return xA+gapLength*Math.cos(CM_DegToRad(gapDegreeAngle));}
//------------------------------------------------------------------------------
//	点Aからある距離、ディグリー角度にある点Bのy座標を取得する
//	CM_GetGapY(yA,gapLength,gapDegreeAngle)
var CM_GetGapY=function (
	yA,				// 点Aのy座標
	gapLength,		// 点Bまでの距離
	gapDegreeAngle	// 点Bへの絶対角度
){return yA+gapLength*Math.sin(CM_DegToRad(gapDegreeAngle));}
