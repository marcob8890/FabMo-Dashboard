context.models.App = Backbone.Model.extend({
	defaults:{
		name : null,
		icon_path : null,
		app_path : null,
		app_url : null,
		id : null
	},
	sync : function(method, model, option) {} // Override sync because this is a local model
});

context.models.Apps = Backbone.Collection.extend({
	model : context.models.App
});

context.models.RemoteMachine = Backbone.Model.extend({
	defaults:{
		hostname:'<unknown>',
		network: []
	},
	sync : function(method, model, option) {} // Override sync because this is a local model	
});

context.models.File = Backbone.Model.extend({
	defaults:{
		id: null,
		status : 'pending',
		url:''
	},
	sync : function(method, model, option) {} // Override sync because this is a local model	
	
});

context.models.Files = Backbone.Collection.extend({
	model : context.models.Files,
});



context.models.Job = Backbone.Model.extend({
	defaults:{
		id: null,
		files : new context.models.Files(),
		status:'pending'
	},
	sync : function(method, model, option) {} // Override sync because this is a local model	
});



context.models.RemoteMachines = Backbone.Collection.extend({
	model : context.models.RemoteMachine,
});

context.models.SettingFormLine = Backbone.Model.extend({
	defaults:{
		setting_label:null,
		setting_value:null,
		type:"text",
		code:null,
		id : null
	},
	sync : function(method, model, option) {} // Override sync because this is a local model
});



context.models.SettingsForm = Backbone.Collection.extend({
	model : context.models.SettingFormLine
});
