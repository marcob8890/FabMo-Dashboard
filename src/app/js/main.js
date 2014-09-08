var package_file = require('../package.json');
var app_manager = require('./js/app_manager.js');

var App = Backbone.Model.extend({
	defaults:{
		name : null,
		source_path : null,
		tmp_path : null,
		icon_path : null
	},
	initialize : function() {
		console.log("App model created");
	},
	sync : function(method, model, option) {}
});

var Apps = Backbone.Collection.extend({
	model : App
})

var NavbarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		var template = _.template($("#navbar_template").html(), {});
		this.$el.html(template);
	}
});

var AppsView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		var template = _.template($("#app_selector_template").html(), {});
		this.$el.html(template);
	}
});

navbarView = new NavbarView({el : "#navbar_container"});
//appsView = new AppView({el : "#content_container"});

console.log("RUNNING MAIN")
switch(package_file.debug) {
	case false:
	case undefined:
	case null:

		break;

	default:
		// DEBUG MODE
				// NORMAL MODE
		FabMoAutoConnect(function(err,tool){
			if(err){
				console.log(err);
				return;
			} else {
				global.tool=tool;
			}
			// Display the apps launcher here
		},package_file.detection_service_port||8080);

		app_manager.load_apps(package_file.apps_dir || './apps', function(err, apps) {
			console.log(apps);
		});
		break;
}