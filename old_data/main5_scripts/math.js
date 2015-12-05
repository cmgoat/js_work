var cm=function(x){return x;}

//------------------------------------------------------------------------------
//	���W�A���p�x����f�B�O���[�p�x���擾����
//	CM_RadToDeg(rad)
var CM_RadToDeg=function (
	rad	// ���W�A���p�x
){return rad*180/Math.PI}
//------------------------------------------------------------------------------
//	�f�B�O���[�p�x���烉�W�A���p�x���擾����
//	CM_DegToRad(deg)
var CM_DegToRad=function (
	deg	// ���W�A���p�x
){return deg*Math.PI/180}
//------------------------------------------------------------------------------
//	2�_�Ԃ̋������擾����
//	CM_GetGapLength(xA,yA,xB,yB)
var CM_GetGapLength=function (
	xA,	// �_A��x���W
	yA,	// �_A��y���W
	xB,	// �_B��x���W
	yB	// �_B��y���W
){return((xB-xA)^2+(yB-yA)^2)^0.5;}
//------------------------------------------------------------------------------
//	�_A����_B�ւ̃f�B�O���[�p�x���擾����
//	CM_GetGapAngle(xA,yA,xB,yB)
var CM_GetGapAngle=function (
	xA,	// �_A��x���W
	yA,	// �_A��y���W
	xB,	// �_B��x���W
	yB	// �_B��y���W
){return CM_RadToDeg(Math.atan2(yB-yA,xB-xA));}
//------------------------------------------------------------------------------
//	�_A���炠�鋗���A�f�B�O���[�p�x�ɂ���_B��x���W���擾����
//	CM_GetGapX(xA,gapLength,gapDegreeAngle)
var CM_GetGapX=function (
	xA,				// �_A��x���W
	gapLength,		// �_B�܂ł̋���
	gapDegreeAngle	// �_B�ւ̐�Ίp�x
){return xA+gapLength*Math.cos(CM_DegToRad(gapDegreeAngle));}
//------------------------------------------------------------------------------
//	�_A���炠�鋗���A�f�B�O���[�p�x�ɂ���_B��y���W���擾����
//	CM_GetGapY(yA,gapLength,gapDegreeAngle)
var CM_GetGapY=function (
	yA,				// �_A��y���W
	gapLength,		// �_B�܂ł̋���
	gapDegreeAngle	// �_B�ւ̐�Ίp�x
){return yA+gapLength*Math.sin(CM_DegToRad(gapDegreeAngle));}
