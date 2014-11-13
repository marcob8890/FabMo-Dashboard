var fs=require('fs');
var inquirer = require('inquirer');

var schema = 
[
	{
	    type: "input",
	    message: "Enter your name",
	    name: "author_name",
	    validate: function( answer ) {
	      if ( answer.length < 2 ) {
	        return "You must enter a name of more than two characters";
	      }

	      return true;
	  	}
	},
	{
	    type: "input",
	    message: "Enter your email",
	    name: "author_email",
	    validate: function( answer ) {
	      filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	      if ( !filter.test(answer) ) {
	        return "You must enter a valid email";
	      }
	      return true;
	  	}
	},
	{
	    type: "input",
	    message: "Enter your website",
	    name: "author_website"
	}
];

inquirer.prompt(schema, function( answers ) {
	console.log( JSON.stringify(answers, null, "  ") );
	var data =JSON.stringify({
		"name" : answers.author_name,
		"email" : answers.author_email,
		"website": answers.author_website
	},null,2);
	fs.writeFile('author.json', data,function(err){
		if(err) throw err;
	});
});