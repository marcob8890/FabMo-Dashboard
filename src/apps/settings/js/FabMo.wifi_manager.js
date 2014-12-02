function WifiManager(tool) //ip and port of the tool
{
	this.tool = tool;
	this.url = {};
	this.url.base = 'http://'+this.tool.ip+':'+this.tool.port;
	this.url.base = this.url.base+"/wifi_manager";
	this.url.scan=this.url.base+'/detection';
	this.url.add_profile=this.url.base+'/profile';
	this.url.get_profiles=this.url.base+'/profiles';
	this.url.delete=this.url.base+'/profile';
	this.default_error = {};
	this.default_error = {
			         'no_device' : {
				     'message' :'the device you try to acccess is not reacheable !',
				     'sys_err' : '' //give the error returned by javascript interpreter
				 }
    };
}


WifiManager.prototype.scan = function(callback)
{
	if (!callback)
		throw "this function need a callback to work !";
	var that=this;
	$.ajax({
		url: this.url.scan,
		type: "GET",
		dataType : 'json', 
		success: function( data ) {
			callback(undefined,data);
			},
		error: function(data,err) {
				var error = that.default_error.no_device;
				error.sys_err = err;
			 	callback(error);
			}
	});
}


WifiManager.prototype.list_profiles = function(callback)
{
	if (!callback)
		throw "this function need a callback to work !";
	var that=this;
	$.ajax({
		url: this.url.get_profiles,
		type: "GET",
		dataType : 'json', 
		success: function( data ){
			 	callback(undefined,data);
			 },
		error: function( data, err ){
				var error = that.default_error.no_device;
				error.sys_err = err;
			 	callback(error);
			 }
	});
}



WifiManager.prototype.delete = function(ssid,callback)
{
	if (!callback)
		throw "this function need a callback to work !";
	var that = this;
	$.ajax({
		url: this.url.delete + "/" + ssid,
		type: "DELETE",
		dataType : 'json', 
		success: function( data ) {
			callback(undefined);
			},
		error: function(data,err) {
				var error = that.default_error.no_device;
				error.sys_err = err;
			 	callback(error);
			}			
	});
}

WifiManager.prototype.add_profile =  function(profile,callback)
{
	if (!callback)
		throw "this function need a callback to work !";
	var that=this;
	$.ajax({
		url: this.url.add_profile,
		type: "POST",
		dataType : 'json', 
		data : { wifi_info : profile },
		success: function( data ) {
			if(data.error)callback(data.error);
			else
				callback(undefined);
		},
		error: function(data, err) {
    		var error = that.default_error.no_device;
			error.sys_err = err;
		 	callback(error);
		}
	});
}