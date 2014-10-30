/* 
 * app.js is the application bootstrap script.  It configures require.js for including javascript modules
 * and launches the application entry point file which is main.js
 */
requirejs.config({
    baseUrl: 'js'
});

// require.js plays havoc with node-webkit.  After include require.js, we actually
// patch up the node-webkit built-in require, and just use the `requirejs` namespace for accessing
// our application entry point.
window.require = window.requireNode;

// Run the main application!
requirejs(['main']);