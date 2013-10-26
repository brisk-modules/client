var Module = require("brisk").getHelper("module");

var Main = Module.extend({
	dir : __dirname,

	// override with config file...
	config : function(){

		//console.log( app.locals.root );
		return {
			publicDir  : this.app.locals.root + 'public' // no trailing slash...
		  , assetsPath   : '/assets/'
		  , viewsDir   : this.app.locals.root + 'app/views'
		  //, hostname : "localhost:4000" // make this dynamic!
		  , minify     : {
			  use : false
		  },
		  less     : {
			  use : false
		  }
		  , require     : {
			  use : false
		  }
		  //, cdn     : 'cdn.crudr.com'
		  //, ssl        : false
		};

	},

	render: function( app ){
		//
		this.app = app;

		var options = this.config();
		// Initialize the server-side asset processing
		this.app.grunt = require('grunt-render')( options );

	}

});


module.exports = new Main();