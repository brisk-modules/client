var Module = require("brisk").getHelper("module"),
	_ = require("underscore");

var defaults = require("../config/client");

var Main = Module.extend({
	dir : __dirname,

	// override with config file...
	config : function( options ){

		// get custom config
		options = options || {};

		return _.extend({}, defaults, {
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
		// Initialize the server-side asset processing
		this.app.grunt = require('grunt-render')( options );

	}

});


module.exports = new Main();