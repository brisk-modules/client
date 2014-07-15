var brisk = require("brisk"),
	hbs = require('hbs'),
	Main = brisk.getClass("main");

var grunt, app;

var helper = Main.extend({

	init: function( site ){

		grunt = site.modules.app.grunt;
		app = site.modules.app;

		hbs.registerHelper('grunt', this.grunt);
		hbs.registerHelper('client', this.client);
	},

	self: function() {
		return hbs;
	},

	// Helpers

	// output all the local vars on the client-side
	client: function( name ) {
		if( !this._locals) return;
		var escape = ["authenticated", "user", "config"];
		var client = {};
		for( var i in this._locals){
			// escape certain vars
			if( escape.indexOf( i ) > -1 ) continue;
			var val = this._locals[i] || false;
			if( val ){
				client[i] = val;
			}
		}
		var script = "var client = "+ JSON.stringify( client ) +";";
		// get session...
		app.request.session = app.request.session || {};
		var session = app.request.session;
		// check the type of output first?
		if( this._locals.debug || !session ) {
			var html = '<script type="text/javascript">'+ script +'</script>';
		} else {
			var html = '<script type="text/javascript" src="/client.js"></script>';
			// save client script in session
			session.client = script;
		}
		return new hbs.SafeString( html );
	},



	grunt: function(type, name) {
		var options = {};
		// fallbacks...
		// if there is no type, exit now
		if(typeof type == "undefined") return;
		options.type = type;
		// fallback for name
		if(typeof name == "string"){
			options.name = name;
		}

		// fn will compile the body section between the tags
		var files = arguments[arguments.length-1].fn || false;

		if( files ){
			options.files = files();
		};

		var html = grunt[type]( options );
		return new hbs.SafeString( html );

	}

});


module.exports = helper;
