var zip = require('adm-zip');
var path = require('path');
var os = require('os');
if (os.platform() === 'darwin'){ //if MAC OSX	
var tmp_app_directory ='./tmp/app/';
}else{
var tmp_app_directory ='./tmp/app/';
}

/*need the path of the application to load (.fma)*/
function load_app(app_path,callback){
	decompress_app(app_path,function(index_page){

		global.app_loaded=index_page;
		callback('./app_executer.html');
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
