// Events and keypress handlers in the FabMo-Dashboard
$(document).keydown(function(e){
	if (e.keyCode == 75) {
		if($('#tool-modal').hasClass('open')) {
    		$('#tool-modal').foundation('reveal', 'close');
    	}
    	else {
    		$('#tool-modal').foundation('reveal', 'open');
    	}
	}

	/*if($('#tool-modal').hasClass('open')) {
	    if (e.keyCode == 37) {
	        alert("Left !");
	    }
	 
	    if (e.keyCode == 39) {
	        alert("Right !");
	    }

	    if (e.keyCode == 38) {
	        alert("Up !");
	    }
	 
	    if (e.keyCode == 40) {
	        alert("Down !");
	    }

	    if (e.keyCode == 33) {
	    	if(e.ctrlKey)
	        	alert("Ctrl + Page Up !");
	        else if (e.shiftKey)
	        	alert("Shift + Page Up !");
	        else
	        	alert("Just -- Page Up !");
	    }
	 
	    if (e.keyCode == 34) {
	        if(e.ctrlKey)
	        	alert("Ctrl + Page Down !");
	        else if (e.shiftKey)
	        	alert("Shift + Page Down !");
	        else
	        	alert("Just -- Page Down !");
	    }
	}*/
});

resizedoc = function(){
	var l=0; var r=0;

	if($("body").width()/parseFloat($("body").css("font-size"))>40.063) {
		$("#main").addClass("offcanvas-overlap-right");
	}
	else {
		$("#main").removeClass("offcanvas-overlap-right");
		$("#main").removeClass("offcanvas-overlap-left");
		$("#widget-links-general").removeClass("colapsed");
		$("#left-menu").removeClass("colapsed");
	}

	if($("#left-menu").css("position")=="relative") { l=parseInt($("#left-menu").css("width"))+1; }
	else {l=0;}

	if( ($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
		r=250;
	} else {r=0;}

	r=r+l;
	$(".main-section").css("width",$("body").width()-r+"px");
};

resizedocclick = function(){
	var l=0; var r=0;

	if($("#left-menu").css("position")=="relative") { l=parseInt($("#left-menu").css("width"))+1; }
	else {l=0;}

	if( !($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
		r=250;
	} else {r=0;}

	r=r+l;
	$(".main-section").css("width",$("body").width()-r+"px");
};

colapseMenu = function() {
	if($("#widget-links-general").hasClass("colapsed"))	{
		$("#widget-links-general").removeClass("colapsed");
		$("#left-menu").removeClass("colapsed");
	}

	else {
		$("#widget-links-general").addClass("colapsed");
		$("#left-menu").addClass("colapsed");
	}

	resizedoc();
};


widgetToolsNetwork = function() {
	if ($("#widget-tools-network .tools-other").hasClass("hidden")) {
		$("#widget-tools-network .tools-other").removeClass("hidden");
		$("#widget-tools-network .refresh").removeClass("hidden");
	}
	else {
		$("#widget-tools-network .tools-other").addClass("hidden");
		$("#widget-tools-network .refresh").addClass("hidden");
	}
};

$(document).ready( function() {
	resizedoc();
	$(".right-small .right-off-canvas-toggle").click( function() {resizedocclick();});
	$(window).resize( function() {resizedoc();});
	$("#icon_colapse").click(function() { colapseMenu(); });
	$("#widget-tools-network div").click( function() {widgetToolsNetwork(); });
});