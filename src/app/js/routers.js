dashboard.Router = Backbone.Router.extend({
	routes: {
		"app/:id"     :"launch_app",
		"menu"        :"show_menu"
	},
	launch_app: function(id) {
		appClientView.setModel(dashboard.apps.get(id));
		appMenuView.hide();
		appClientView.show();
	},
	show_menu: function() {
		appClientView.hide();
		appMenuView.show();
	}
});
