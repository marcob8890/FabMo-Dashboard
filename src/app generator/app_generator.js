var fs=require('fs');
var inquirer = require('inquirer');
var Mustache = require('mustache');

var author;
try{author=require('./author.json');}
catch(ex){console.log("you need to create a developer account first ! (run 'grunt author_information')");return;}
if(!author.name || !author.email){console.log("your developer account is corrupted ! (grunt developer-information)");return;}

function app_generator(cb){
	process.chdir(__dirname);
	var schema = 
	[
		{
		    type: "input",
		    message: "Enter the application name",
		    name: "app_name",
		    validate: function( answer ) {
		    	var done = this.async(); //this validate is asynchronous
		      if ( answer.length < 2 ) {
		         done("You must enter a name of more than two characters");
		         return;
		      }
		      else{
		      	fs.stat('../apps/'+answer,function(err,stat){
		      		if(!err){//file exist
		      			done("there is already an app with the same name.");
		      			return;
		      		}
		      		fs.stat('../apps/'+answer+'.fma',function(err,stat){
				      		if(!err){//file exist
				      			done("there is already a bundled app with the same name.");
				      			return;
				      		}
				      		done(true);
				      		return;
				    });
		      	});
		      }



		      return true;

		    }
		},
		{
		    type: "input",
		    message: "Enter the application description",
		    name: "desc",
		    validate: function( answer ) {
		      if ( answer.length < 5 ) 
		         return "You must enter a description of more than five characters";
		      return true;
		    }
		},
		{
		    type: "checkbox",
		    message: "Select the target(s) :",
		    name: "target",
		    choices: [
		      {
		        name: '3dprinter'
		      },
		      {
		        name: 'lasercutter'
		      },
		      {
		        name: 'router',
		        checked: true

		      }
		    ],
		    validate: function( answer ) {
		      if ( answer.length < 1 ) {
		        return "You must choose at least one target";
		      }
		      return true;
		    }
		  },
		  {
		    type: "list",
		    message: "Select the type :",
		    name: "type",
		    choices: [
		      {
		        name: "gcode-generator",
		        checked: true
		      },
		      {
		        name: "opensbp-generator"
		      },
		      {
		        name: "multimachine"
		      },
		      {
		        name: "tool"
		      }
		    ],
		    validate: function( answer ) {
		      if ( answer.length < 1 ) {
		        return "You must choose at least one type";
		      }
		      return true;
		    }
		  },
		  {
		    type: "checkbox",
		    message: "Libraries to include :",
		    name: "libraries",
		    choices: [
		      {
		        name: "bootstrap"
		      },
		      {
		        name: "jquery"
		      },
		      {
		        name: "foundation"
		      }
		    ]
		  }

	];

	inquirer.prompt(schema, function( answers ) {
		console.log( JSON.stringify(answers, null, "  ") );

		//Create folder structure
		console.log('creating folder ...');
		var app_path = '../apps/'+answers.app_name + '/';
		fs.mkdir(app_path,function(err){
			if(err){console.log(err);return;}

			//copy default icon
			console.log('coping icon ...');
			copyFile("./default_icon.png",app_path+"icon.png",function(err){
				if(err){console.log(err);return;}
			});

			//TODO : include libs

			//create package.json
			fs.readFile("package_json.template",'utf-8', function(err,template){
				if(err){console.log(err);return;}

				var view = {};
				view.app = {
						name : answers.app_name,
						targets : JSON.stringify(answers.target)
					};
				view.developer= author;

				var output = Mustache.render(template, view);
				console.log('creating package.json ...');
				fs.writeFile(app_path + 'package.json',output,'utf-8',function(err){
					if(err){console.log(err);return;}
				});
			});

			//create index.html
			var file_type="";

			switch(answers.type){

				case "gcode-generator" :
					file_type="app_gcodegenerator.template";
					break;
				case "opensbp-generator" :
					file_type="app_opensbpgenerator.template";
					break;
				case "multimachine" :
					file_type="app_multimachines.template";
					break;
				case "tool" :
					file_type="app_tool.template";
					break;
			}

			fs.readFile(file_type,'utf-8', function(err,template){
				if(err){console.log(err);return;}

				var view = {};
				view.app = {
						name : answers.app_name,
						desc : answers.desc,
						targets : JSON.stringify(answers.target)
					};
				view.dev= author;
				view.librairies = {
						css : [],
						js : []
				};

				var output = Mustache.render(template, view);
				console.log('creating index.html ...');
				fs.writeFile(app_path + 'index.html',output,'utf-8',function(err){
					if(err){console.log(err);return;}
					cb();
				});
			});
		});
	});
}

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
module.exports = app_generator;