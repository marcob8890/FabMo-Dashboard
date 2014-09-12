/*
 * main.js kicks off the application once all the model and view prototypes have been created.
 */
 
navbarView = new context.views.NavbarView({el : "#navbar_container"});

switch(nwkg_package_file.debug) {
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