dashboard.models.App = Backbone.Model.extend({
	defaults:{
		name : null,
		icon_path : null,
		app_path : null,
		app_url : null,
		id : null
	},
	sync : function(method, model, option) {} // Override sync because this is a local model
});

dashboard.models.Apps = Backbone.Collection.extend({
	model : dashboard.models.App
});
