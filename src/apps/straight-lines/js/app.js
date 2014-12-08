/*
***
*** Library that should be shared between apps
***
*** Have the following functionalities :
***	- Store, Retrieve, Delete custom DATAS (settings, project, configuration...)
*** - Have access to a generic "Project Settings model", to facilite project settings (size, bit) & GCODE generation
*** - Function to generate simple GCODE commands (Line, circle, ellipse)
*** - Function to parse simple gcode to create a toolpath (add general offset, bit offset to cut outside / inside a line)
*/




/*
*** Custom App Settings ***
*/


/* App Settings */
setAppSetting = function(app,setting,val) {
	if (localStorage.getItem('app-' + app)) {
		var s = JSON.parse(localStorage.getItem('app-' + app));
	}
	else {
		var s= {};
	}
	s[setting] = val;
	localStorage.setItem('app-' + app,JSON.stringify(s));
};

getAppSetting = function(app,setting) {
	if(localStorage.getItem('app-' + app)) {
		if(JSON.parse(localStorage.getItem('app-' + app))[setting])
			return JSON.parse(localStorage.getItem('app-' + app))[setting];
		else return false;
	}
	else {
		return false;
	}
};

delAppSetting = function(app,setting) {
	if (localStorage.getItem('app-' + app)) {
		var s = JSON.parse(localStorage.getItem('app-' + app));
		delete s[setting];
		localStorage.setItem('app-' + app,JSON.stringify(s));
	}
};





/*
*** Project Settings ***
*/


/********** Model and function related to tool & project settings **********/
settings = function(){
	var dashSettings = getAppSetting("straight-lines","s") ? getAppSetting("straight-lines","s") : false;

	this.x= dashSettings ? dashSettings.x : 3; //x Size of project
	this.y= dashSettings ? dashSettings.y : 2; //y Size of project
	this.z= dashSettings ? dashSettings.z : 0.3; //Max thickness of project
	this.dz= dashSettings ? dashSettings.dz : 0.1; //Depth of each z pass
	this.x0= dashSettings ? dashSettings.x0 : 0; //x Translation from X0
	this.y0= dashSettings ? dashSettings.y0 :0; //t Translation from Y0
	this.z0= dashSettings ? dashSettings.z0 : 0.5; //Delta z for air movements
	this.cut_speed= dashSettings ? dashSettings.cut_speed : 20; //1 to 600
	this.air_speed= dashSettings ? dashSettings.air_speed : 600; //1 to 600
	this.bit_d= dashSettings ? dashSettings.bit_d : 0.125; //Bit Diameter
};

settings.prototype.update = function(){
	this.x=parseFloat($("#s_x").val());
	this.y=parseFloat($("#s_y").val());
	this.z=parseFloat($("#s_z").val());
	this.dz=parseFloat($("#s_dz").val());
	this.x0=parseFloat($("#s_x0").val());
	this.y0=parseFloat($("#s_y0").val());
	this.cut_speed=parseFloat($("#s_cut_speed").val());
	this.bit_d=parseFloat($("#s_bit_d").val());
};

settings.prototype.synch = function(){
	$("#s_x").val(this.x.toString());
	$("#s_y").val(this.y.toString());
	$("#s_z").val(this.z.toString());
	$("#s_dz").val(this.dz.toString());
	$("#s_x0").val(this.x0.toString());
	$("#s_y0").val(this.y0.toString());
	$("#s_cut_speed").val(this.cut_speed.toString());
	$("#s_bit_d").val(this.bit_d.toString());
}

setting.prototype.set = function(setting,value){
	if(this[setting]){
		this[setting]=value;
		return true;
	}
	else {
		return false;
	}
}

settings.prototype.get = function(setting){
	if(this[setting]){
		return this[setting]
	}
	else {
		return null;
	}
}