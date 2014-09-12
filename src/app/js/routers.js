context.Router = Backbone.Router.extend({
	routes: {
		"app/:id"     :"launch_app",
		"menu"        :"show_menu"
	},
	launch_app: function(id) {
		appClientView.setModel(context.apps.get(id));
		appMenuView.hide("fast");
		appClientView.show("fast");
	},
	show_menu: function() {
		appClientView.hide("fast");
		appMenuView.show("fast");
	}
});
