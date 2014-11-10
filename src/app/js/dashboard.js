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
		this.allowKeypad = true;
	};

	// Brings up the keypad/DRO in the dashboard
	Dashboard.prototype.keypad = function(){
		//$('#tool-modal').foundation('reveal', 'open');
		1;
	};

	// Brings up the DRO (if separate from the keypad) in the dashboard
	Dashboard.prototype.DRO = function(){
		context.openDROPanel();
	};

	// Bring up the home/zero display
	Dashboard.prototype.homing = function(){
		$('#home-zero-modal').foundation('reveal', 'open');
	};

	// Bring up the job manager
	Dashboard.prototype.JobManager = function(){
		var list_job = this.machine.list_job();
		var list_job_view = new context.views.listJobView({el : '#job_list_container', collection : list_job});
		$('#job-manager-modal').foundation('reveal', 'open');
	};

	Dashboard.prototype.keyCommands = function(){
		$(document).keydown(function(e){
			if ( (e.keyCode == 75) && (this.allowKeypad) ){
				1;
		    }
		});
	};

	// The dashboard is a singleton which we create here and make available as this module's export.
	var dashboard = new Dashboard();
	
	return dashboard

});