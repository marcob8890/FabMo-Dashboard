/*
 * This is where the application context that we will expose to the "apps" will go
 * This will include the currently selected machine (if any) as well as functions to interact with the dashboard itself.
 * This is different than the context provided by context.js, which is the context for the entire dashboard, not just
 * the parts that we want the app to see.
 */

define(function(require) {

	Dashboard = function() {
		this.machine = null;
		this.message = "Test dashboard object";
	};

	Dashboard.prototype.keypad = function(){
		$('#tool-modal').foundation('reveal', 'open');
	};

	Dashboard.prototype.DRO = function(){
		context.openDROPanel();
	};

	Dashboard.prototype.homing = function(){
		$('#home-zero-modal').foundation('reveal', 'open');
	};

	Dashboard.prototype.JobManager = function(){
		var list_job = this.machine.list_job();
		var list_job_view = new context.views.listJobView({el : '#job_list_container', collection : list_job});
		$('#job-manager-modal').foundation('reveal', 'open');
	};

	var dashboard = new Dashboard();
	
	return dashboard

});