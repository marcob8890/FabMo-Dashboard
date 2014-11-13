/*
 * This is where the application context that we will expose to the "apps" will go
 * This will include the currently selected machine (if any) as well as functions to interact with the dashboard itself.
 * This is different than the context provided by context.js, which is the context for the entire dashboard, not just
 * the parts that we want the app to see.
 */

define(function(require) {

	/*** Init *///
	Dashboard = function() {
		this.machine = null;
		this.keyCommands(this);
	};

	/*** Prototypes ***/

	// Brings up the DRO (if separate from the keypad) in the dashboard
	Dashboard.prototype.DRO = function(){
		context.openDROPanel();
	};

	// Bring up the job manager
	Dashboard.prototype.jobManager = function(){
		var list_job = this.machine.list_job();
		var list_job_view = new context.views.listJobView({el : '#job_list_container', collection : list_job});
		$('#job-manager-modal').foundation('reveal', 'open');
	};

	// Open and close the right menu
	Dashboard.prototype.bindRightMenu = function() {
		if($("#main").hasClass("offcanvas-overlap-left")){
			$("#main").removeClass("offcanvas-overlap-left");
		}
		else {
			$("#main").addClass("offcanvas-overlap-left");
		}
		resizedoc();
	}

	// React to keydown on "k" shortcute, show / hide right menu and show keypad if allowed
	Dashboard.prototype.keyCommands = function(dashboard){
		$(document).keydown(function(e){
			if ((e.which == 75)) {
				dashboard.keypad(dashboard);
			}
		});
	};

	Dashboard.prototype.keypad = function(dashboard) {
		if (dashboard.machine) {
			if(dashboard.ui.statusKeypad()) {
				dashboard.bindRightMenu();
			}
			else dashboard.notification("error","KeyPad Unvailable");
		}
		else dashboard.notification("warning","Please Connect to a tool");
	};

	Dashboard.prototype.notification = function(type,message) {
		if(type=='info') 			toastr.info(message);
		else if (type=="success") 	toastr.success(message);
		else if (type=="warning") 	toastr.warning(message);
		else if (type=="error") 	toastr.error(message);
	}


	/*** Functions ***/
	jobManager = function() {
		require('context').launchApp('job-manager');
	};

	// The dashboard is a singleton which we create here and make available as this module's export.
	var dashboard = new Dashboard();
	
	return dashboard

});