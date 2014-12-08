//Global var
var s = null;
var Lines = [] ;

/********** Function for "Lines" object = all the tasks **********/
Lines.reset = function(){
	//Set the number of lines to 0
	this.length = 0;
};

Lines.add = function(){
	//Create a new line (task)
	var newLine = new line(
	parseFloat($("#x0").val()),
	parseFloat($("#y0").val()),
	parseFloat($("#x1").val()),
	parseFloat($("#y1").val()),
	Lines.length.toString(),
	$("#name").val()
);

//Add this to the list of lines
this.push(newLine);

//Reset the value of "name" input & unique id "cid"
$("#name").val("");
$("#name").data("cid","");
};

Lines.remove = function(id){
	//Search the position of the line to remove. Then remove
	Lines.splice(Lines.pos(id), 1);
};

Lines.edit = function(id){
	//Search the position of the line to edit & get this line
	var l = Lines[Lines.pos(id)];

	//Update it status to current
	l.setCurrent()

	//Load Form with properties
$("#name").val(l.name);
$("#name").data("cid",l.id)
$("#x0").val(l.x0.toString());
$("#y0").val(l.y0.toString());
$("#x1").val(l.x1.toString());
$("#y1").val(l.x1.toString());
};

Lines.save = function(id){
	//Search for the line
	var l = Lines[Lines.pos(id)];

	//Add attributes
	l.x0 = parseFloat($("#x0").val());
l.y0 = parseFloat($("#y0").val());
l.x1 = parseFloat($("#x1").val());
l.y1 = parseFloat($("#y1").val());
l.name = $("#name").val();

	//Remove current
	l.resetCurrent();

	//Reset the value of "name" input & unique id "cid"
$("#name").val("");
$("#name").data("cid","");
}

Lines.view = function(){
	var str=""; //Str will be the HTML content
	$.each(this, function(index,line){
		str += line.viewLine(); //For each Line, we add the HTML content
	});
	$(".list-lines-container").html(str); //Set this into the HTML table

	//Synch the click listener on this view
	listenClickTasks();
};

Lines.pos = function(id) {
	var pos = false;
	$.each(this, function(index,line) {
		if(line.id == id) {
			pos = index;
		}
	});
	return pos;
};

//Sort Line by position
Lines.sort = function(){
	this.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );
};


	/********** Model and function of a single line **********/
line = function(x0,y0,x1,y1,l,name) {
	this.id="line-" + l;
	this.pos = l;
	name ? this.name = name : this.name = this.id;
	this.current=0;
	this.x0=x0; //X start position of a line
	this.y0=y0; //Y start position of a line
	this.x1=x1; //X end position of a line
	this.y1=y1; //Y end position of a line
};

line.prototype.update = function(x0,y0,x1,y1,name,pos) {
	this.x0=x0; //X start position of a line
	this.y0=y0; //Y start position of a line
	this.x1=x1; //X end position of a line
	this.y1=y1; //Y end position of a line
	
	if(name) this.name=name;
	//else name = "Line" + pos;
};

line.prototype.viewLine = function() {
	var str = "";
	str += "<tr class='" + (this.current ? 'current' : '') + "' id='" + this.id + "'>";
	str += "<td>" + this.name + "</td>";
	str += "<td>(" + this.x0.toString() + "," + this.y0.toString() + ") - (" + this.x1.toString() + "," + this.y1.toString() + ")</td>";
	str += "<td class='edit'>E</td>";
	str += "<td class='delete'>D</td>";
	str += "</tr>";
	return str;
};

line.prototype.setCurrent = function() { this.current=1 };
line.prototype.resetCurrent = function() { this.current=0 };