define(function(require) {

	models = {}

	models.App = Backbone.Model.extend({
		defaults:{
			name : null,
			icon_path : null,
			app_path : null,
			app_url : null,
			id : null
		},
		sync : function(method, model, option) {} // Override sync because this is a local model
	});

	models.Apps = Backbone.Collection.extend({
		model : models.App
	});

	models.RemoteMachine = Backbone.Model.extend({
		defaults:{
			//Add a listener when the state changes
			hostname:'<unknown>',
			network: [],
			state: 'disc' //state = status : ''=green=OK : 'err'=red=Trying to connect, or error to connec : 'disc'=grey=Not connected
		},
		sync : function(method, model, option) {} // Override sync because this is a local model	
	});

	models.File = Backbone.Model.extend({
		defaults:{
			id: null,
			status : 'pending',
			url:''
		},
		sync : function(method, model, option) {} // Override sync because this is a local model	
		
	});

	models.Files = Backbone.Collection.extend({
		model : models.Files,
	});

	models.Job = Backbone.Model.extend({
		defaults:{
			id: null,
			files : new models.Files(),
			status:'pending'
		},
		sync : function(method, model, option) {} // Override sync because this is a local model	
	});

	models.RemoteMachines = Backbone.Collection.extend({
		model : models.RemoteMachine,
	});

	models.SettingFormLine = Backbone.Model.extend({
		defaults:{
			setting_label:null,
			setting_value:null,
			type:"text",
			code:null,
			id : null
		},
		sync : function(method, model, option) {} // Override sync because this is a local model
	});

	models.SettingsForm = Backbone.Collection.extend({
		model : models.SettingFormLine
	});

	return models;
});
