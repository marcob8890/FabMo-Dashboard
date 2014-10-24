/*
 * This is the application context, which maintains all of the prototypes for all of the models and views
 * as well as instances of some of these which are needed by the application in general.
 * 
 * The application context is global, and this file should be included first, so that models.js, views.js and 
 * the application router can populate it with all of the necessary objects.
 */
var context = {
	models : {},
	views : {},
	router : null
};