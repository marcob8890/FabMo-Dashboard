/*
 * routers.js defines the application routers which map URLs to application functions.
 */
define(function(require) {

	var Router = Backbone.Router.extend({
		routes: {
			"app/:id"     		: "launch_app",
			"menu"        		: "show_menu",
			"refresh_machines" 	: "refresh_machines",
			"set_machine/:id" 	: "set_machine"
		},
		launch_app: function(id) {
			this.context.appClientView.setModel(this.context.apps.get(id));
			this.context.appMenuView.hide();
			this.context.appClientView.show();
		},
		show_menu: function() {
			this.context.appClientView.hide();
			this.context.appMenuView.show();
		},
		set_machine: function(id) {
			machine = this.context.remoteMachines.get(id);
			console.log("SETTING MACHINE");
			console.log(machine.attributes);
			ChooseBestWayToConnect(machine.attributes, function(ip, port) {
				dashboard.machine = new FabMo(ip, port);
				dashboard.ui= new FabMoUI(dashboard.machine);
				this.context.bindKeypad(dashboard.ui);
				this.context.loadSettingsForms(dashboard.machine);
			}.bind(this));
		},
		refresh_machines: function() {
			this.context.refreshRemoteMachines(function(err,remoteMachines){
				if(this.context.remoteMachines.models.length === 0)
				{
					console.log('no machine detected');
				}
				else if(this.context.remoteMachines.models.length === 1)
				{
					ChooseBestWayToConnect(remoteMachines.models[0].attributes,function(ip,port){
						dashboard.machine = new FabMo(ip, port);
						dashboard.ui= new FabMoUI(dashboard.machine);
						this.context.bindKeypad(dashboard.ui);
						this.context.loadSettingsForms(dashboard.machine);
					}.bind(this));
				}
				else{
					this.context.openSettingsPanel();
				}
			}.bind(this));
		},
		setContext: function(context) {
			this.context = context;
		}
	});

	return Router;
});