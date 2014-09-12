// VIEWS
dashboard.views.NavbarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		var template = _.template($("#navbar-template").html(), {});
		this.$el.html(template);
	}
});

dashboard.views.AppIconView = Backbone.View.extend({
	tagName : 'div',
	className : 'app-icon',
	template : _.template($("#app-icon-template").html()),
	initialize : function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

dashboard.views.AppMenuView = Backbone.View.extend({
	tagName : 'div',
	className : 'app-menu',
	collection : null,
	initialize : function(options) {
		_.bindAll(this, 'render');
		this.collection = options.collection
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);
		this.render();
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		this.collection.forEach(function(item) {
			var appIconView = new dashboard.views.AppIconView({ model: item });
			element.append(appIconView.render().el);
		});
		return this;
	},
	show : function(arg) {
		$(this.el).show(arg);
	},
	hide : function(arg) {
		$(this.el).hide(arg);
	}
});

dashboard.views.AppClientView = Backbone.View.extend({
	tagName : 'div',
	className : 'app',
	template : _.template($("#app-client-template").html()),
	model : new dashboard.models.App(),
	initialize : function(options) {
		_.bindAll(this, 'render');
	},
	render : function() {
		element = jQuery(this.el);
		element.html(this.template)
		iframe = element.find('.app-iframe');
		url = this.model.get('app_url');
		iframe.attr('src',url);
	},
	show : function(arg) {
		$(this.el).show(arg);
	},
	hide : function(arg) {
		$(this.el).hide(arg);
	},
	setModel : function(model) {
		this.model.set(model.toJSON());
		this.render();
	}
});
