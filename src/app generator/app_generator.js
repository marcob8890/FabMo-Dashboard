var fs=require('fs');
var inquirer = require('inquirer');
var mustache = require('mustache');

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
	      if ( answer.length < 2 ) {
	        return "You must enter a name of more than two characters";
	      } return true;

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
	fs.mkdir('../apps/'+answers.app_name);
	//copy default icon
	//TODO
	//include libs

	//create package.json

	//create index.html
});
