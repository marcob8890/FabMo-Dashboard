/*
 * main.js kicks off the application once all the model and view prototypes have been created.
 */
 
// The navbarView is temporarily superseded by the 
//navbarView = new context.views.NavbarView({el : "#navbar_container"});


// remoteMachines is the backbone collection of all the tools available on the network
var remoteMachines = new context.models.RemoteMachines();
var remoteMachineMenuView = new context.views.RemoteMachineMenuView({el : '#remote-machine-menu', collection : remoteMachines});

function refreshRemoteMachines(callback) {
	DetectToolsOnTheNetworks(function(err, machines) {
		if(err) {
			return console.log(err);
		}
		console.log(machines);
		var machine_models = [];
		for(var index in machines){
			machine_model = new context.models.RemoteMachine({
				hostname : machines[index].hostname,
				network : machines[index].network
			});
			machine_models.push(machine_model);
		}
		remoteMachines.reset(machine_models);
		if(typeof callback === 'function') callback(null, remoteMachines);
	},8080);
}

switch(nwkg_package_file.debug) {
	// NORMAL MODE
	case false:
	case undefined:
	case null:
		refreshRemoteMachines(function(err,remoteMachines){
			if(remoteMachines.models.length === 0)
			{
				console.log('no machine detected');
			}
			else if(remoteMachines.models.length === 1)
			{
				ChooseBestWayToConnect(remoteMachines.models[0].attributes,function(ip,port){
					dashboard.machine = new FabMo(ip, port);
					dashboard.ui= new FabMoUI(dashboard.machine);
					bindKeypad(dashboard.ui);
					loadSettingsForms(dashboard.machine);
				});
			}
			else{
				openSettingsPanel();
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
					loadSettingsForms(dashboard.machine);
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
		if($(this).is('#tool-modal'))
			ui.allowKeypad();
	});
	$(document).on('close.fndtn.reveal', '[data-reveal]',  function (e) {
		if($(this).is('#tool-modal'))
			ui.forbidKeypad();
	});
}

	$('.button-homexy').click(function(e) {gcode('G28.2 X0 Y0'); });
	$('.button-homez').click(function(e) {gcode('G28.2 Z0'); });
	$('.button-probez').click(function(e) {gcode('G38.2 Z-4 F10\nG10 L2 P1 Z-0.125'); });   

	$('.button-zerox').click(function(e) {gcode('G28.3 X0'); });  
	$('.button-zeroy').click(function(e) {gcode('G28.3 Y0'); });  
	$('.button-zeroz').click(function(e) {gcode('G28.3 Z0'); });

function openSettingsPanel(){
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap-right');
}

function openDROPanel(){
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap-left');
}

function closeSettingsPanel(){
	$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap-right');
}

function closeDROPanel(){
	$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap-left');
}


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

function loadSettingsForms(machine){
	$(document).on('opened.fndtn.reveal', '[data-reveal]',  function (e) {
		if($(this).is('#settings-modal')){
			loadDriverSettings(machine);
		}
	});
	/*$(document).on('close.fndtn.reveal', '[data-reveal]',  function (e) {
		if($(this).is('#settings-modal')){
			loadDriverSettings();
		}
	});*/
}

function loadDriverSettings(machine){
	machine.get_config(function(err,config){
		if(err){console.log(err);return;}
		var settings_fields = [];
		var count=0;
		// TODO change it with the next implementation of the settings files
		config.forEach(function(val,idx,arr){
			var setting_field = {};
			var key = Object.keys(val)[0];
			setting_field.setting_label = key;
			setting_field.setting_value = val[key];
			setting_field.code = key;
			setting_field.type="text";
			settings_fields.push(setting_field);
			count++;
			if(count === config.length){
				console.log(settings_fields);
				new context.views.SettingsFormView({collection : new context.models.SettingsForm(settings_fields), el : '#core_settings_form'});
			}
		});

	});
}
