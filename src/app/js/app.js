requirejs.config({
    baseUrl: 'js'
});

window.require = window.requireNode;

// Single entry point for require program
requirejs(['main']);