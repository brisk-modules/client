var Module = require("brisk").getHelper("module"),
	_ = require("underscore");

var defaults = require("../config/client");

var Main = Module.extend({
	dir : __dirname,

	// override with config file...
	config : function( options ){

		// get custom config
		options = options || {};

		return Object.extend({}, defaults, {
			publicDir: this.app.locals.root + 'public', // no trailing slash...
			assetsPath: '/assets/',
			viewsDir: this.app.locals.root + 'app/views',
			//hostname : "localhost:4000", // make this dynamic!
		}, options);

	},

	render: function( app, config ){
		// fallbacks
		config = config || {};
		//
		this.app = app;

		var options = this.config( config );
		// initialize the server-side asset processing
		var Build = require('grunt-render').Build;
		this.app.grunt = new Build( options );

	}

});

// Helpers

// deep extend
Object.extend = function() {
	var objects = Array.prototype.slice.apply( arguments );
	var destination = objects.shift();
	for (var i in objects){
		var source = objects[i];
		for (var property in source) {
			if (source[property] && source[property].constructor &&
			 source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
	}
	return destination;
};


exports = module.exports = new Main();

// exposing main class to support multi-site setups
exports.Class = Main;
