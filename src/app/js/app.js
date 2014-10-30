/*
 * app.js
 * ------
 * 
 * app.js is the entry point of the application.  It configures require.js for including javascript modules
 * and launches the main script file which is main.js
 */
requirejs.config({
    baseUrl: 'js'
});

window.require = window.requireNode;

// Single entry point for require program
requirejs(['main']);