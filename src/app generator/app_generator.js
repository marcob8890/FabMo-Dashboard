var fs=require('fs');
var inquirer = require('inquirer');
var Mustache = require('mustache');

var author;
try{author=require('./author.json');}
catch(ex){console.log("you need to create a developer account first ! (grunt developer-information)");return;}
if(!author.name || !author.email){console.log("your developer account is corrupted ! (grunt developer-information)");return;}

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
	    type: "checkbox",
	    message: "Select the target(s) :",
	    name: "target",
	    choices: [
	      {
	        name: "3dprinter"
	      },
	      {
	        name: "lasercutter"
	      },
	      {
	        name: "router",
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
		fs.readFile("package_json.template",'utf8', function(err,template){
			if(err){console.log(err);return;}
			var view = {};
			view.app = {
					name : answers.app_name,
					targets : JSON.stringify(answers.target)
				};
			view.developer= author;

			var output = Mustache.render(template, view);
			console.log('creating package.json ...');
			fs.writeFile(app_path + 'package.json',output,function(err){
				if(err){console.log(err);return;}
			});
			

		//create index.html
				
		});




	});


});


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