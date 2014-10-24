//Events and keypress in the dashboard

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