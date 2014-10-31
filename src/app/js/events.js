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
	if($("body").width()/parseFloat($("body").css("font-size"))>64.063) {
	  if($("#main").hasClass("offcanvas-overlap-right") && $("#main").hasClass("offcanvas-overlap-left")) {
	    $(".main-section").css("width",$("body").width()-500+"px");
	  }
	  else if($("#main").hasClass("offcanvas-overlap-right") || $("#main").hasClass("offcanvas-overlap-left")) {
	    $(".main-section").css("width",$("body").width()-250+"px");
	  }
	  else {$(".main-section").css("width","100%");}
	}
	else {$(".main-section").css("width","100%");}
};

resizedocclick = function(c){
	if($("body").width()/parseFloat($("body").css("font-size"))>64.063) {
	  if($("#main").hasClass("offcanvas-overlap-right") && $("#main").hasClass("offcanvas-overlap-left")) {
	    $(".main-section").css("width",$("body").width()-250+"px");
	  }
	  else if(($("#main").hasClass("offcanvas-overlap-right") && c==2) || ($("#main").hasClass("offcanvas-overlap-left") && c==1)) {
	    $(".main-section").css("width",$("body").width()-500+"px");
	  }
	  else if(($("#main").hasClass("offcanvas-overlap-right") && c==1) || ($("#main").hasClass("offcanvas-overlap-left") && c==2)) {
	    $(".main-section").css("width","100%");
	  }
	  else {$(".main-section").css("width",$("body").width()-250+"px");}
	}
	else {$(".main-section").css("width","100%");}
};

$(".left-small").click( function() {resizedocclick(1);});
$(".right-small").click( function() {resizedocclick(2);});

$(document).ready( function() {
	resizedoc();
	$(window).resize( function() {resizedoc();});
});