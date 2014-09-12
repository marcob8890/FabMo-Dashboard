var os=require('os');
var util=require('util');
var EventEmitter = require('events').EventEmitter;
var dgram = require('dgram');
var os = require('os');

var OK = "YES I M !\0";
var ERR = "I DNT UNDRSTND !\0";
var HOSTNAME = "U NAME ?\0";
var REQ = "R U A SBT ?\0";
var socket;
var broadcastAddress = '255.255.255.255';
var broadcastPort = 24862; // = 7777 without conversion

//ennoying funcction but no other way to deal with it in windows
function send_broadcast_to_every_interfaces(){
	Object.keys(os.networkInterfaces()).forEach(function(key,index,arr){ //val = ip adresses , key = name of interface
		var networks_list = this;
		networks_list[key].forEach(function(val2,key2,arr2){
			if (val2.internal === false && val2.family === 'IPv4')
			{
				if (val2.address.split('.')[0] >= 192 &&  val2.address.split('.')[0] <= 223){ //class C
					broadcastAddress = val2.address.split('.')[0] +'.'+ val2.address.split('.')[1] +'.'+ val2.address.split('.')[2] + '.255';
				}
				else if (val2.address.split('.')[0] >= 128 &&  val2.address.split('.')[0] <= 191){ //class B 
					broadcastAddress = val2.address.split('.')[0]  +'.'+ val2.address.split('.')[1] + '.255.255';
				}
				else if (val2.address.split('.')[0] >= 1 &&  val2.address.split('.')[0] <= 126) { //class A
					broadcastAddress = val2.address.split('.')[0] + '.255.255.255';
				}
				socket.send(new Buffer(REQ), 0, REQ.length, broadcastPort, broadcastAddress, function (err) {
						if (err) console.log(err);
				});
			}
		});
	},os.networkInterfaces());
	socket.send(new Buffer(REQ), 0, REQ.length, broadcastPort,'192.168.10.7', function (err) { //usb0
		if (err) console.log(err);
		});
}

var detection = function(t) {
	socket = dgram.createSocket('udp4');
	var current_dialog =[];
	var device;
	var devices =[];
	
	var timeout = t || 1100;
	var that =this;
	socket.bind(function(){
		socket.setBroadcast(true);
	});

		socket.on("message", function ( data, rinfo ) {
			if(data.toString() == OK)
			{
				//console.log("response from : " +rinfo.address);
				socket.send(new Buffer(HOSTNAME), 0, HOSTNAME.length, broadcastPort, rinfo.address, function (err) {
							if (err) console.log(err);
							//console.log("ask info");
						});
				current_dialog.push(rinfo.address); // add ip in an array
			}
			else if(current_dialog.indexOf(rinfo.address)!==-1) // if the device is a sbt, continue the dialog.
			{
				current_dialog.splice(current_dialog.indexOf(rinfo.address), 1); //end of dialog (remove ip from array )
				//console.log(data.toString().replace('\0', '').replace(/é/gi,'e').replace(/ /gi,'_')+ ',"active_ip" : "' +rinfo.address+'"}');
				//substract \0 character of the string before parsing.
				try{
					device = JSON.parse('{"device" : ' + data.toString().replace('\0', '') + ',"active_ip" : "'+ rinfo.address+'"}');
				}catch(ex)
				{
					console.log(ex);
				}
				devices.push(device);
				that.emit('new_device',device);
			}
			else
			{
				console.log("[detection_tool.js] received from "+rinfo.address+" : unknow message : '"+ data.toString() +"'");
			}
		});
		if(os.platform()==='win32'){
			send_broadcast_to_every_interfaces();
		}
		else{
			socket.send(new Buffer(REQ), 0, REQ.length, broadcastPort, broadcastAddress, function (err) {
						if (err) console.log(err);
					});
			socket.send(new Buffer(REQ), 0, REQ.length, broadcastPort, "192.168.10.1", function (err) {});
		}



	this.on('newListener', function(listener) {
	});
	
	setTimeout(function(){
		if(os.platform()!=='darwin'){socket.close();}
		that.emit("devices",devices);
		return 0; //close the function
	}, timeout);
};
util.inherits(detection , EventEmitter);
module.exports = detection;
