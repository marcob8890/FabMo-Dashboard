/*
 * main.js kicks off the application once all the model and view prototypes have been created.
 */
 
// The navbarView is temporarily superseded by the 
//navbarView = new context.views.NavbarView({el : "#navbar_container"});


// remoteMachines is the backbone collection of all the tools available on the network
var remoteMachines = new context.models.RemoteMachines();
remoteMachineMenuView = new context.views.RemoteMachineMenuView({el : '#remote-machine-menu', collection : remoteMachines});

function refreshRemoteMachines(callback) {
	// NORMAL MODE
	DetectToolsOnTheNetworks(function(err, machines) {
		if(err) {
			return console.log(err);
		}
		var machine_models = [];
		machines.forEach(function(machine) {
			machine_model = new context.models.RemoteMachine({
				hostname : machine.hostname,
				network : machine.network
			});
			machine_models.push(machine_model);
		});
		remoteMachines.reset(machine_models);
		if(typeof callback === 'function') callback(null, remoteMachines);
	},8080);
}

switch(nwkg_package_file.debug) {
	case false:
	case undefined:
	case null:
		refreshRemoteMachines();
		break;

	default:
		// DEBUG MODE
		FabMoAutoConnect(function(err,fabmo){
			if(err){
				console.log(err);
				return;
			} else {
				fabmo.get_info(function(err,info){
					if(err)
						console.log(err);
					fabmo.hostname = info?info.surname:undefined;
					remoteMachines.reset([
						new context.models.RemoteMachine({
							hostname : fabmo.hostname,
							ip : fabmo.ip,
							port : fabmo.port
						})
					]);
					dashboard.machine = fabmo;
					dashboard.ui = new FabMoUI(fabmo);
					bindKeypad(dashboard.ui);
				});
			}
		},nwkg_package_file.detection_service_port||8080);

		break;
}



appClientView = new context.views.AppClientView({el : "#app-client-container"});

nwkg_app_manager.load_apps(nwkg_package_file.apps_dir || './apps', function(err, apps) {
	context.apps = new context.models.Apps(apps);
	appMenuView = new context.views.AppMenuView({collection : context.apps, el : '#app_menu_container'});
});

// Start the application
router = new context.Router();
Backbone.history.start();

function bindKeypad(ui){
	$(document).on('opened.fndtn.reveal', '[data-reveal]',  function (e) {
		dashboard.ui.allowKeypad();
	});
	$(document).on('close.fndtn.reveal', '[data-reveal]',  function (e) {
		dashboard.ui.forbidKeypad();
	});
	$(document).on('opened.fndtn.reveal', '[data-reveal]',  function (e) {
		dashboard.ui.allowKeypad();
	});
	$(document).on('close.fndtn.reveal', '[data-reveal]',  function (e) {
		dashboard.ui.forbidKeypad();
	});
}