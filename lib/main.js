var Module = require("brisk").getHelper("module");

var Main = Module.extend({
	dir : __dirname,

	init: function( site ){
		console.log("site", site);
		this.app = site.modules.app;

		var options = this.config();
		// Initialize the server-side asset processing
		this.app.grunt = require('grunt-render')( options );

	},

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

	}

});


module.exports = new Main();