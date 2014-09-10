var package_file = require('../package.json');
var app_manager = require('./js/app_manager.js');
var _ = require('./js/libs/underscore.js')._
// MODELS
var App = Backbone.Model.extend({
	defaults:{
		name : null,
		icon_path : null,
		app_path : null,
		app_url : null
	},
	initialize : function() {
		console.log("Loaded app '" + this.get('name') + "'");
	},
	sync : function(method, model, option) {} // Override sync because this is a local model
});

var Apps = Backbone.Collection.extend({
	model : App
});


// VIEWS
var NavbarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		var template = _.template($("#navbar-template").html(), {});
		this.$el.html(template);
	}
});

var AppIconView = Backbone.View.extend({
	tagName : 'div',
	className : 'app-icon',
	template : _.template($("#app-icon-template").html()),
	initialize : function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var AppMenuView = Backbone.View.extend({
	tagName : 'div',
	className : 'app-menu',
	collection : null,
	initialize : function(options) {
		_.bindAll(this, 'render');
		this.collection = options.collection
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);
		this.render();
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		this.collection.forEach(function(item) {
			var appIconView = new AppIconView({ model: item });
			element.append(appIconView.render().el);
		});
		return this;
	},
	show : function() {
		$(this.el).show();
	},
	hide : function() {
		$(this.el).hide();
	}

});

navbarView = new NavbarView({el : "#navbar_container"});

switch(package_file.debug) {
	case false:
	case undefined:
	case null:
		// NORMAL MODE
		break;

	default:
		// DEBUG MODE
		FabMoAutoConnect(function(err,tool){
			if(err){
				console.log(err);
				return;
			} else {
				global.tool=tool;
			}
			// Display the apps launcher here
		},package_file.detection_service_port||8080);

		break;
}

app_manager.load_apps(package_file.apps_dir || './apps', function(err, apps) {
	apps_collection = new Apps(apps);
	appMenuView = new AppMenuView({collection : apps_collection, el : '#app_menu_container'});
});
