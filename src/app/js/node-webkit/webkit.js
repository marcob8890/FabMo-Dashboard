// Node webkit globals
var nwkg_package_file = require('../package.json');
var nwkg_win = require('nw.gui').Window.get();
var nwkg_app_manager = require('./js/node-webkit/app_manager.js');
var _ = require('./js/libs/underscore.js')._

nwkg_win.on('document-start',function(frame){
	try{
		// create a global variable in the app context. (so developers can grap information directly from this variable, in a secure way.)
		frame.contentWindow.dashboard = dashboard
	} catch(e) {
		console.log(e);
	}
});

