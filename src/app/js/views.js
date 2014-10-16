// VIEWS
context.views.NavbarView = Backbone.View.extend({
	initialize : function() {
		this.render();
	},
	render : function() {
		var template = _.template($("#navbar-template").html(), {});
		this.$el.html(template);
	}
});

context.views.AppIconView = Backbone.View.extend({
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

context.views.AppMenuView = Backbone.View.extend({
	tagName : 'div',
	className : 'app-menu',
	collection : null,
	initialize : function(options) {
		_.bindAll(this, 'render');
		this.collection = options.collection;
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);
		this.render();
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		this.collection.forEach(function(item) {
			var appIconView = new context.views.AppIconView({ model: item });
			element.append(appIconView.render().el);
		});
		return this;
	},
	show : function() {
		$(this.el).show();
	},
	hide : function() {
		$(this.el).hide();
	}
});

context.views.AppClientView = Backbone.View.extend({
	tagName : 'div',
	className : 'app',
	model : new context.models.App(),
	initialize : function(options) {
		_.bindAll(this, 'render');
	},
	render : function() {
		element = jQuery(this.el);
		iframe = element.find('.app-iframe');
		url = this.model.get('app_url');
		iframe.attr('src',url);
	},
	show : function() {
		$(this.el).show();
	},
	hide : function(arg) {
		$(this.el).hide();
	},
	setModel : function(model) {
		this.model.set(model.toJSON());
		this.render();
	}
});

context.views.RemoteMachineMenuView = Backbone.View.extend({
	tagName : 'ul',
	className : 'off-canvas-list',
	collection : null,
	initialize : function(options) {
		this.collection = options.collection;
		this.collection.bind('reset', this.render, this);
		this.collection.bind('add', this.render, this);
		this.collection.bind('remove', this.render, this);
		_.bindAll(this, 'render');
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		element.append('<li><label>Machines on Network <a href="#/refresh_machines" style="display:inline;">refresh</a></label></li>');
		var template = _.template('<li ><a href="#/set_machine/<%= id %>"><%= hostname %></a></li>');

		this.collection.forEach(function(item) {
			attr = _.clone(item.attributes);
			attr.id = item.cid;
			element.append(template(attr));
		}.bind(this));
		//element.append('<li><a href="#/refresh_machines">Refresh...</a></li>');

		return this;
	},
	// hack for the "non-reload on same url" problem with backbone.js
	// more explanation on http://movableapp.com/2012/06/how-to-refresh-router-action-backbonejs-tutorial/
    events: {
        'click a' : 'onClick'
    },
    onClick: function( e ) {
        router.navigate('/');
    }
});



context.views.JobView = Backbone.View.extend({
	tagName : 'div',
	className : 'job',
	template : _.template($("#job-template").html()),
	initialize : function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

context.views.JobListView = Backbone.View.extend({
	tagName : 'div',
	className : 'jobs_list',
	collection : null,
	initialize : function(options) {
		_.bindAll(this, 'render');
		this.collection = options.collection;
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);
		this.render();
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		this.collection.forEach(function(item) {
			var appIconView = new context.views.JobView({ model: item });
			element.append(JobView.render().el);
		});
		return this;
	},
	show : function() {
		$(this.el).show();
	},
	hide : function() {
		$(this.el).hide();
	}
});


context.views.SettingsFormLineView = Backbone.View.extend({
	tagName : 'div',
	className : 'settings-form-line',
	template : _.template($("#settings-form-line-template").html()),
	initialize : function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

context.views.SettingsFormView = Backbone.View.extend({
	tagName : 'div',
	className : 'settings-form',
	collection : null,
	initialize : function(options) {
		_.bindAll(this, 'render');
		this.collection = options.collection;
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);
		this.render();
	},
	render : function() {
		var element = jQuery(this.el);
		element.empty();
		this.collection.forEach(function(item) {
			var settingsFormLineView = new context.views.SettingsFormLineView({ model: item });
			element.append(settingsFormLineView.render().el);
		});
		return this;
	},
	show : function() {
		$(this.el).show();
	},
	hide : function() {
		$(this.el).hide();
	}
});
