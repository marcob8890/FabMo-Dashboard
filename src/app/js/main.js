/*
 * main.js kicks off the application once all the model and view prototypes have been created.
 */

define(function(require) {

var context = require('context');
var webkit = require('node-webkit/webkit');

dashboard = {}

switch(webkit.package.debug) {
	// NORMAL MODE
	case false:
	case undefined:
	case null:
		context.refreshRemoteMachines(function(err,remoteMachines){
			if(context.remoteMachines.models.length === 0)
			{
				console.log('no machine detected');
			}
			else if(context.remoteMachines.models.length === 1)
			{
				ChooseBestWayToConnect(context.remoteMachines.models[0].attributes,function(ip,port){
					dashboard.machine = new FabMo(ip, port);
					dashboard.ui= new FabMoUI(dashboard.machine);
					context.bindKeypad(dashboard.ui);
					context.loadSettingsForms(dashboard.machine);
				});
			}
			else{
				context.openSettingsPanel();
			}
		});
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
					context.remoteMachines.reset([
						new context.models.RemoteMachine({
							hostname : fabmo.hostname,
							ip : fabmo.ip,
							port : fabmo.port
						})
					]);
					dashboard.machine = fabmo;
					dashboard.ui = new FabMoUI(fabmo);
					context.bindKeypad(dashboard.ui);
					context.loadSettingsForms(dashboard.machine);
				});
			}
		},webkit.package.detection_service_port||8080);

		break;
}

webkit.app_manager.load_apps(webkit.package.apps_dir || './apps', function(err, apps) {
	context.apps = new context.models.Apps(apps);
	context.appMenuView = new context.views.AppMenuView({collection : context.apps, el : '#app_menu_container'});
});

// Start the application
router = new context.Router();
router.setContext(context);
Backbone.history.start();

$('.button-homexy').click(function(e) {gcode('G28.2 X0 Y0'); });
$('.button-homez').click(function(e) {gcode('G28.2 Z0'); });
$('.button-probez').click(function(e) {gcode('G38.2 Z-4 F10\nG10 L2 P1 Z-0.125'); });   

$('.button-zerox').click(function(e) {gcode('G28.3 X0'); });  
$('.button-zeroy').click(function(e) {gcode('G28.3 Y0'); });  
$('.button-zeroz').click(function(e) {gcode('G28.3 Z0'); });

function gcode(string) {
		dashboard.machine.gcode(string,function(err,data){
			if(!err) {
				console.log('Success: ' + string);
			} else {
				console.log('Failure: ' + string);
			}
		});
	}

function addJob(job,callback){
	dashboard.machine.send_job(job,function(err){
		if(err){console.log(err);callback(err);return;}
		if(callback && typeof(callback) === "function")callback(undefined);
	});
}


});

