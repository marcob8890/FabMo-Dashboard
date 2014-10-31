/*
 * This is the application context, which maintains all of the prototypes for all of the models and views
 * as well as instances of some of these which are needed by the application in general.  The context provides 
 * high-level application functions as well in the form of methods.
 * 
 * context.js loads the application models, views and routers, and makes them available, so application script
 * files need only `require('context')` in order to communicate with the top-level application.
 * 
 * This is the sort of application logic that would typically go in an `app.js` - owing to this being the main
 * file of many single page web applications.  Here, we call it the "application context" because the notion of
 * app is already monopolized by the FabMo apps concept. 
 */

 define(function (require) {

 	var models = require('models');
 	var views = require('views');
 	var Router = require('routers');

	ApplicationContext = function() {
		// Model/View/Router Prototypes
		this.models = models;
		this.views = views;
		this.Router = Router;

		// Model Instances
		this.remoteMachines = new this.models.RemoteMachines();
		this.widgets = new this.models.Widgets();

		// View Instances
		this.remoteMachineMenuView = new this.views.RemoteMachineMenuView({el : '#remote-machine-menu', collection : this.remoteMachines});
		this.appClientView = new this.views.AppClientView({el : "#app-client-container"});
	};

	ApplicationContext.prototype.openSettingsPanel = function(){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap-right');
	}

	ApplicationContext.prototype.openDROPanel = function(){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap-left');
	}

	ApplicationContext.prototype.closeSettingsPanel = function(){
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap-right');
	}

	ApplicationContext.prototype.closeDROPanel = function() {
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap-left');
	}

	ApplicationContext.prototype.loadSettingsForms = function(machine){
		$(document).on('opened.fndtn.reveal', '[data-reveal]',  function (e) {
			if($(this).is('#settings-modal')){
				loadDriverSettings(machine);
			}
		});
	}

	ApplicationContext.prototype.loadDriverSettings = function(machine){
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
					new this.views.SettingsFormView({collection : new this.models.SettingsForm(settings_fields), el : '#core_settings_form'});
				}
			}.bind(this));

		});
	}

	ApplicationContext.prototype.refreshRemoteMachines = function(callback) {
		DetectToolsOnTheNetworks(function(err, machines) {
			if(err) {
				return console.log(err);
			}
			console.log("REMOTE MACHINES")
			console.log(machines);
			var machine_models = [];
			for(var index in machines){
				machine_model = new this.models.RemoteMachine({
					hostname : machines[index].hostname,
					network : machines[index].network,
					server_port : machines[index].server_port
				});
				machine_models.push(machine_model);
			}
			this.remoteMachines.reset(machine_models);
			if(typeof callback === 'function') callback(null, this.remoteMachines);
		}.bind(this),8080);
	};

	ApplicationContext.prototype.bindKeypad = function(ui){
		$(document).on('opened.fndtn.reveal', '[data-reveal]',  function (e) {
			if($(this).is('#tool-modal'))
				ui.allowKeypad();
		});
		$(document).on('close.fndtn.reveal', '[data-reveal]',  function (e) {
			if($(this).is('#tool-modal'))
				ui.forbidKeypad();
		});
	}

	return new ApplicationContext();
});
