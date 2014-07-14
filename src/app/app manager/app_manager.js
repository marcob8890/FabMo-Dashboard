var zip = require('adm-zip');
var path = require('path');


/*need the path of the application to load (.fma)*/
function load_app(app_path,callback){
	decompress_app(app_path,function(index_page){
		global.app_loaded=index_page;
		callback('./app_executer.html');
	});

}

/* decompress the app and return the temporary link of the home page*/
function decompress_app(app_path,callback){
	var tmp_app_path="./tmp/app/"+path.basename(app_path)+"/";
	var app = new zip(app_path);
	console.log(app);
	app.extractAllTo(/*target path*/tmp_app_path, /*overwrite*/true);
	try{
		var package_info = require(tmp_app_path+'package.json');
		callback('../../'+path.join(tmp_app_path,package_info.main));
	}
	catch(ex){
		console.log(ex);
	}
	
}
