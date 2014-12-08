/*
 * This is where the application context that we will expose to the "apps" will go
 * This will include the currently colored machine (if any) as well as functions to interact with the dashboard itself.
 * This is different than the context provided by context.js, which is the context for the entire dashboard, not just
 * the parts that we want the app to see.
 */

define(function(require) {

	/*** Init *///
	Dashboard = function() {
		this.machine = null;
		this.ui = null;

		this.keyCommands();
		this.checkDashboardSettings();

		//Refresh of the tool status on the dashboard
		this.refresh = 500; // define the tool connection refresh time (ms)
		setInterval(this.updateStatus.bind(this),this.refresh);
	};

	/*** Prototypes ***/
	Dashboard.prototype.updateStatus = function(){
		//if (this.ui.tool.status == )
		if(this.ui) {
			if(this.ui.tool.state) {
				console.log(this.ui.tool.state);
			}
		}
	};

	// Brings up the DRO (if separate from the keypad) in the dashboard
	Dashboard.prototype.DRO = function(callback){
		if(!callback) {
			return console.log("This function 'DRO' needs a callback to run");
		}
		else {
			that=this;
			that.notification('info','Move the tool if necessary, then hit "Enter');
			that.openRightMenu(); //Open the menu to let the user control the tool

			//Waiting keydown on "enter" key, before calling callback.
			var key=$(document).keydown(function(e){
				if ((e.which == 13)) {
					if(typeof callback === 'function') callback(key);
				}
			});
		}
		return;
	};

	Dashboard.prototype.addJob = function(gcode, settings){
		console.log("AddJob Function");
		that=this;
		//that.DRO(function(err){
			/*
			if(err){
				that.notification("error",err);
			}
			*/
			//else {
				var job = that.parseGCode(gcode,settings);
				that.machine.run_local_file(gcode,'gc',function(message){
					console.log(message);
				});
			//}
		//});
		return;
	}

	Dashboard.prototype.parseGCode = function(g,s){
		return g;
	};

	// Bring up the job manager
	Dashboard.prototype.jobManager = function(){
		var list_job = this.machine.list_job();
		var list_job_view = new context.views.listJobView({el : '#job_list_container', collection : list_job});
		$('#job-manager-modal').foundation('reveal', 'open');
	};

	//Open the right menu
	Dashboard.prototype.openRightMenu = function() {
		that=this;
		$("#main").addClass("offcanvas-overlap-left");
		if(that.machine) {
			that.ui.setMenuOpen();
		}
		resizedoc();
	}

	//Close the right menu
	Dashboard.prototype.closeRightMenu = function() {
		that=this;
		$("#main").removeClass("offcanvas-overlap-left");
		if(that.machine) {
			that.ui.setMenuClosed();
		}
		resizedoc();
	}

	// Open and close the right menu
	Dashboard.prototype.bindRightMenu = function() {
		that=this;
		if($("#main").hasClass("offcanvas-overlap-left")){
			that.closeRightMenu();
		}
		else {
			that.openRightMenu();
		}
	}

	// React to keydown on "k" shortcute, show / hide right menu and show keypad if allowed
	Dashboard.prototype.keyCommands = function(){
		that=this;
		$(document).keydown(function(e){
			if (e.which == 75) {
				that.keypad(true);
			}

			//Development only : Run the DRO function with a callback, with "d" shortcode
			if (e.which == 68) {
				that.DRO(function(ev){
					that.closeRightMenu();
					that.notification("success","DRO Worked");
					ev=null;
				});
			}
		});

		$(".right-small .right-off-canvas-toggle").click( function() {
			resizedocclick();
			that.keypad(false);
		});
	};

	Dashboard.prototype.keypad = function(test) {
		that=this;
		if (that.machine) {
			if(that.ui.statusKeypad() && test) {
				that.bindRightMenu();
			}
			else that.notification("error","KeyPad Unvailable");
		}
		else that.notification("warning","Please Connect to a tool");
	};

	Dashboard.prototype.notification = function(type,message) {
		if(type=='info') 			toastr.info(message);
		else if (type=="success") 	toastr.success(message);
		else if (type=="warning") 	toastr.warning(message);
		else if (type=="error") 	toastr.error(message);
		else console.log("Unknown type of notification");
	};

	Dashboard.prototype.checkDashboardSettings = function() {
		var that=this;
		 var s=JSON.parse(localStorage.getItem('dashboardSettings'));

        if (s == null) {
          console.log("No Settings Defined, Load defaults settings");
          //Load Default Settings into S variable
          s={
			"appName": {
				"name":"DashBoard Name",
				"value":"FabMo DashBoard",
				"type":"text"
			},
			"mainColor": {
				"name":"Main Color (top-bar...)",
				"value":"#313366",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#444"]
			},
			"secondColor": {
				"name":"Secondary color (menu...)",
				"value":"#444",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#444"]
			},
			"positionBackground": {
				"name":"Main Dashboard Color",
				"value":"#9c210c",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#111"]
			},
			"positionFront": {
				"name":"Main Dashboard Color",
				"value":"#9c210c",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#111"]
			},
			"keypadBackground": {
				"name":"Main Dashboard Color",
				"value":"#dd8728",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#111"]
			},
			"keypadFront": {
				"name":"Main Dashboard Color",
				"value":"#9c210c",
				"type":"color",
				"colors": ["#54ba4c","#313366","#dd8728","#9c210c","#111"]
			},
			"leftMenuDefaultColapsed": {
				"name":"Colapsed Left Menu",
				"value":true,
				"type":"checkbox"
			}
		};
        localStorage.setItem('dashboardSettings',JSON.stringify(s));
      }

      this.updateDashboardSettings();
	}

	Dashboard.prototype.updateDashboardSettings = function() {
		var s=JSON.parse(localStorage.getItem('dashboardSettings'));

        if (s != null) {
        	$("#dashboardName").html(s.appName.value);
        	$("title").html(s.appName.value);
        }
	};

	Dashboard.prototype.resetDashboardSettings = function() {
		localStorage.setItem('dashboardSettings',null);
		this.checkDashboardSettings();
	}

	/*** Functions ***/
	jobManager = function() {
		require('context').launchApp('job-manager');
	};

	// The dashboard is a singleton which we create here and make available as this module's export.
	var dashboard = new Dashboard();
	
	return dashboard

});