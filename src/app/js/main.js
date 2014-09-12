var package_file = require('../package.json');
var app_manager = require('./js/app_manager.js');
var _ = require('./js/libs/underscore.js')._

navbarView = new dashboard.views.NavbarView({el : "#navbar_container"});

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

console.log(dashboard.models)
console.log(dashboard.views)
appClientView = new dashboard.views.AppClientView({el : "#app-client-container"});

app_manager.load_apps(package_file.apps_dir || './apps', function(err, apps) {
	dashboard.apps = new dashboard.models.Apps(apps);
	appMenuView = new dashboard.views.AppMenuView({collection : dashboard.apps, el : '#app_menu_container'});
});

// Start the application
router = new dashboard.Router();
Backbone.history.start();