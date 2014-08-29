var zip = require('adm-zip');
var path = require('path');
var os = require('os');
var ncp = require('ncp').ncp;
var fs = require('fs');

ncp.limit = 16;

if (os.platform() === 'darwin'){ //if MAC OSX	
var tmp_app_directory ='./tmp/app/';
}else{
var tmp_app_directory ='./tmp/app/';
}

/* Load an app and display it (either an .fma or a directory) */
function load_app(app_path,callback){
	fs.stat(app_path,function(err,stats){
		if(err) {
			throw "fs.stat error!"
		}
		if(stats.isDirectory()) {
			console.log('Loading app as directory');
			copy_app(app_path, function(index_page) {
				global.app_loaded=index_page;
				callback('./app_executer.html');
			});
		} else {
			decompress_app(app_path,function(index_page){
				global.app_loaded=index_page;
				callback('./app_executer.html');
			});
		}
	});
}

/* Works just like decompress app, but without the decompression, just copies an expanded app */
function copy_app(app_dir, callback) {
	if (os.platform() === 'darwin'){ //if MAC OSX	
		var tmp_app_path='tmp/app/'+path.basename(app_dir)+"/";
		app_path=path.join('./',app_dir);
	}else{
		var tmp_app_path=tmp_app_directory+path.basename(app_dir)+"/";
	}

	ncp(app_dir, tmp_app_path, function (err) {
		if (err) {
			return console.error(err);
		}
		if (os.platform() === 'darwin'){ //if MAC OSX	
			var package_info = require('../'+tmp_app_path+'package.json');
			console.log(path.join(tmp_app_path,package_info.main));
			callback('app://fabmolinker/'+path.join(tmp_app_path,package_info.main));

		}
		else{
			var package_info = require(tmp_app_path+'package.json');
			callback('app://fabmolinker/'+path.join(tmp_app_path,package_info.main));
		}
	});
}

/* decompress the app and return the temporary link of the home page*/
function decompress_app(app_path,callback){
	
	if (os.platform() === 'darwin'){ //if MAC OSX	
		var tmp_app_path='tmp/app/'+path.basename(app_path)+"/";
		app_path=path.join('./',app_path);
	}else{
		var tmp_app_path=tmp_app_directory+path.basename(app_path)+"/";
	}
	var app = new zip(app_path);
	//console.log(app);
	app.extractAllTo(/*target path*/tmp_app_path, /*overwrite*/true);
	try{
		console.log(tmp_app_path);
		if (os.platform() === 'darwin'){ //if MAC OSX	
			var package_info = require('../'+tmp_app_path+'package.json');
			console.log(path.join(tmp_app_path,package_info.main));
			callback('app://fabmolinker/'+path.join(tmp_app_path,package_info.main));

		}
		else{
			var package_info = require(tmp_app_path+'package.json');
			callback('app://fabmolinker/'+path.join(tmp_app_path,package_info.main));
		}
	}
	catch(ex){
		console.log(ex);
	}
	
}
