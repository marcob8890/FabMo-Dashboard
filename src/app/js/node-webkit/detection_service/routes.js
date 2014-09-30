/**
 * @author jimmy
 */

// Load the route handlers
var detection_module = require('./detection_module_handlers');

module.exports = function(server) {

	// Define the routes
	// detection module
	server.get('/where_is_my_tool', detection_module.where_is_my_tool);

};