define(function(require) {
	context = require('context');

	// VIEWS
	context.views.NavbarView = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		render : function() {
			//var template = _.template($("#navbar-template").html(), {});
			//this.$el.html(template);

	        //Fetching the template contents
	        $.get('template/navbar.html', function (data) {
	            template = _.template(data, {});//Option to pass any dynamic values to template
	            this.$el.html(template);//adding the template content to the main template.
	        }, 'html');
		}
	});

	context.views.AppIconView = Backbone.View.extend({
		tagName : 'li',
		className : 'app-icon',
		template : _.template(require('text!templates/app-icon.html')),
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
			var count = 0;
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
			var cpt=0;
			element.empty();
			var template = _.template('<li class="item <%= current %> tool <%= state %> <%= hidden %>"><span></span><a href="#/set_machine/<%= id %>"><%= hostname %></a></li>');
			this.collection.forEach(function(item) {
				//Move this on view, wich will concert 1 tool, and not all the tools
				cpt++;
				attr = _.clone(item.attributes);
				attr.id = item.cid;
				if (cpt>1) { attr.hidden = 'hidden'; } else { attr.hidden = '';}
				attr.current ='current';
				element.append(template(attr));
			}.bind(this));

			if(cpt == 0) {
				element.append('<li class="item refresh" id="refresh_machines_on_network"><a href="#/refresh_machines"></a></li>');
			}
			else {
				element.append('<li class="item refresh hidden" id="refresh_machines_on_network"><a href="#/refresh_machines"></a></li>');
			}

			return this;
		},
		// hack for the "non-reload on same url" problem with backbone.js
		// more explanation on http://movableapp.com/2012/06/how-to-refresh-router-action-backbonejs-tutorial/
	    events: {
	        'click .tool > a' 	: 'onClick',
	        'click li.tool'		: 'showHideTools'
	    },
	    
	    onClick: function( e ) {
	        router.navigate('/');
	    },

	    //Move this on view, wich will concert 1 tool, and not all the tools
	    showHideTools: function ( e ) {
	    	var o = this.$el.children();
	    	var c = o.length;
			if (c > 1)
				if( o.last().is(":hidden") ) {
					o.slice(1).slideDown("fast");
				}
				else {
					o.slice(1).slideUp("fast");
					/*
					if($(this).parent()[0]!=$( "#remote-machine-menu > li:last" )[0]) {
		              $("#remote-machine-menu > li:first-child").removeClass('current');
		              $(this).parent().addClass('current');
		              $(this).parent().insertBefore($("#remote-machine-menu > li:first-child"));
		              $( "#remote-machine-menu > li").slice(1).slideUp( "fast" );
		            }
	            	*/
				}
	    	}
	});



	context.views.JobView = Backbone.View.extend({
		tagName : 'div',
		className : 'job',
		template : _.template(require('text!templates/job.html')),
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
		template : _.template(require('text!templates/settings-form-line.html')),
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

	return context.views;
});