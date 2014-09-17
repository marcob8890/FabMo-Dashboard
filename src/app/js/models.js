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
		ip:'',
		interface:'',
		port:''
	},
	sync : function(method, model, option) {} // Override sync because this is a local model	
});

context.models.RemoteMachines = Backbone.Collection.extend({
	model : context.models.RemoteMachine,
});
