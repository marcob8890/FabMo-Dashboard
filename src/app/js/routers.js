context.Router = Backbone.Router.extend({
	routes: {
		"app/:id"     		: "launch_app",
		"menu"        		: "show_menu",
		"refresh_machines" 	: "refresh_machines",
		"set_machine/:id" 	: "set_machine"
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
		machine = remoteMachines.get(id);
		console.log("SETTING MACHINE");
		console.log(machine.attributes);
		ChooseBestWayToConnect(machine.attributes, function(ip, port) {
			dashboard.machine = new FabMo(ip, port);
		});
	},
	refresh_machines: function() {
		refreshRemoteMachines();
	}
});
