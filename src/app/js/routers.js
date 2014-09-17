context.Router = Backbone.Router.extend({
	routes: {
		"app/:id"     		: "launch_app",
		"menu"        		: "show_menu",
		"refresh_machines" 	: "refresh_machines",
		"machine/:id" 		: "set_machine"
	},
	launch_app: function(id) {
		appClientView.setModel(context.apps.get(id));
		appMenuView.hide();
		appClientView.show();
	},
	show_menu: function() {
		appClientView.hide();
		appMenuView.show();
	},
	set_machine: function(id) {
		console.log("Setting machine " + id);
	},
	refresh_machines: function() {
		refreshRemoteMachines();
	}
});
