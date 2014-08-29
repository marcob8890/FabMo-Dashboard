var fs = require('fs');
var zip = require('adm-zip');
var path = require('path');
var os = require('os');
var ncp = require('ncp').ncp;
var apps_directory = './apps';
if (os.platform() === 'darwin'){ //if MAC OSX	
var tmp_icon_directory ='./tmp/app_icons';
}else{
var tmp_icon_directory ='./tmp/app_icons';
}
var default_icon = undefined;
var apps_array = [];


fs.readdir(apps_directory, function(err,files){
	if(err){
		console.log('error while reading the content of the apps directory : '+ err);
		return;
	}
	files.forEach(function(file, index, files){
		var file_path = apps_directory + '/' +file;
		fs.stat(file_path,function(err,stats){
			if(err){
				console.log('error while reading the stats of the file '+file_path+ ' : '+err);
				return;
			}
			if(stats.isFile() && path.extname(file) === '.fma'){
				try {
					var app_zip = new zip(file_path);
				}
				catch(ex)
				{
					console.log(file +' is not a readeable app');
				}

				try {
					var package_info = JSON.parse(app_zip.readFile("package.json").toString());
					//console.log(package_info.name);
					//console.log(package_info.icon);
					var tmp_icon_dir =  tmp_icon_directory+'/'+package_info.name;
					app_zip.extractEntryTo(package_info.icon || default_icon ,tmp_icon_dir, false, true);
					var app_info = {'id':undefined,'name':package_info.name,'icon_path':tmp_icon_dir+'/'+package_info.icon,'app_path':file_path};
					//console.log(app_info);
					apps_array.push(app_info);

				}
				catch(ex)
				{
					console.log('non-valid package.json file : '+ex);
					
				}
					
			}
			else if(stats.isDirectory()) {
				try {
					fs.readFile(path.join(file_path, "package.json"), function(err, data) {
						package_info = JSON.parse(data);
						var tmp_icon_dir =  tmp_icon_directory+'/'+package_info.name;
						try { fs.mkdirSync(tmp_icon_dir); } 
						catch(e) {}
						
						ncp(path.join(file_path, package_info.icon || default_icon) ,path.join(tmp_icon_dir, package_info.icon), function(err) {
							console.log(err);
						});
						var app_info = {'id':undefined,'name':package_info.name,'icon_path':tmp_icon_dir+'/'+package_info.icon,'app_path':file_path};
						apps_array.push(app_info);
					});
				}
				catch(ex)
				{
					console.log('non-valid package.json file : '+ex);
					
				}
			}
		});
	});
});


global.apps_array = apps_array;
