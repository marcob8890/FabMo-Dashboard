// Events and keypress handlers in the FabMo-Dashboard

/********** Layout Resize Fonctions **********/
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
		r=parseInt($("#right-menu").css("width")+1);
	} else {r=0;}

	r=r+l;
	$(".main-section").css("width",$("body").width()-r+"px");
};

resizedocclick = function(){
	var l=0; var r=0;

	if($("#left-menu").css("position")=="relative") { l=parseInt($("#left-menu").css("width"))+1; }
	else {l=0;}

	if( !($("#main").hasClass("offcanvas-overlap-left")) && ($("body").width()/parseFloat($("body").css("font-size")))>60.063) {
		r=parseInt($("#right-menu").css("width")+1);
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


/********** Document Ready Init **********/
$(document).ready( function() {
	var bar = document.getElementById('app_menu_container');
		new Sortable(bar, {
		group: "apps",
		ghostClass: "sortable-ghost",
		animation: 150,
		store: {
		  /** Get the order of elements. Called once during initialization. **/
		  get: function (sortable) {
		      var order = localStorage.getItem(sortable.options.group);
		      return order ? order.split('|') : [];
		  },
		  /** Save the order of elements. Called every time at the drag end **/
		  set: function (sortable) {
		      var order = sortable.toArray();
		      localStorage.setItem(sortable.options.group, order.join('|'));
		  }
		}
	});
	resizedoc();
	$(".right-small .right-off-canvas-toggle").click( function() {resizedocclick();});
	$(window).resize( function() {resizedoc();});
	$("#icon_colapse").click(function() { colapseMenu(); });
	$("#widget-tools-network div").click( function() {widgetToolsNetwork(); });
});