		var win = require('nw.gui').Window.get();
		var path = require('path');
		var fs = require('fs');
		var os = require('os');
		var tool = undefined;
		if (os.platform() === 'darwin'){ //if MAC OSX	
			var package_file = require('../package.json');
		}
		else{
			var package_file = require('./package.json');
		}


		if(package_file.debug === false || package_file.debug === undefined || package_file.debug === null){
			FabMoAutoConnect(function(err,my_tool){
				if(err){
					console.log(err);
					window.location.replace('./no_tool.html');
					return;
				}
				global.tool=my_tool;
				window.location.replace('./app manager/app_launcher.html');
			},package_file.detection_service_port||8080);
		}
		else{
				FabMoAutoConnect(function(err,my_tool){
				if(err){
					console.log(err);
					global.tool = new FabMo('localhost',package_file.local_engine_port || '8080');
					window.location.replace('./app manager/app_launcher.html');
					return;
				}
				global.tool=my_tool;
				window.location.replace('./app manager/app_launcher.html');

			},package_file.detection_service_port||8080);
		}

		var rmdir = function(dir) {
		var list = fs.readdirSync(dir);
			for(var i = 0; i < list.length; i++) {
				var filename = path.join(dir, list[i]);
				var stat = fs.statSync(filename);
				
				if(filename == "." || filename == "..") {
					// pass these files
				} else if(stat.isDirectory()) {
					// rmdir recursively
					rmdir(filename);
				} else {
					// rm fiilename
					fs.unlinkSync(filename);
				}
			}
			fs.rmdirSync(dir);
		};

		win.on('close', function(code) {
			this.hide();
			try{
				if (os.platform() === 'darwin'){ //if MAC OSX	
					rmdir('tmp/');
				}
				else{
					rmdir('./tmp/');
				}
			}catch(ex)
			{
				console.log(ex);
			}
			this.close(true);	
		});

		$(document).ready(function(){
			$('.panel').hide();
			$('#device_picker').on('activated',function(e){
				$(this).children('input').each(function () {
					var ip_tab = []; 
					var tool_selector = $(this);
					var tool = JSON.parse($(this).val());
					tool.network.forEach(function(net,index,arr){
						ip_tab.push(net.ip_address);
						if(index===arr.length-1)
						{
							tool_selector.next().append('  '+ JSON.stringify(ip_tab).replace(/\"/g,'')); //use next() for getting the label
							ip_tab = [];
						}
					})
				});

			$('h1').html("Pick a tool");
			$('body').append('<div class="text-center" style="padding : 80px 0 0 0;clear:both;"><a href="index.html"><button class="btn btn-primary btn-lg">Rescan</button></a></div>');
			$(this).children('button').each(function(){
				$(this).addClass("btn btn-default btn-lg");
			});
			$(this).children('input').first().prop("checked", true);
			$('.panel').show(400);
		});
	});
