var brisk = require("brisk"),
	hbs = require('hbs'),
	Parent = brisk.getClass("main");

var blocks = {};

// enviroment state
var DEV = (process.env.NODE_ENV == "production") ? false : true;

var helper = Parent.extend({

	init: function( site ){
		// local reference
		this.site = site;
		this.build = site.modules.app.grunt;

		this._setup();
		// continue with parent (if available)
		if( Parent.prototype.init ) return Parent.prototype.init.call(this, site );
	},

	setup: function(){

	},

	// internal
	_setup: function(){
		// variables
		var Handlebars;
		// get rendering engine
		if( this.site.modules.rendering) {
			Handlebars = site.modules.rendering;
		} else if( this.site.config.client && this.site.config.client.isolation == "true") {
			// create a new instance if we want to isolate the engine (in a multi-site env)
			Handlebars = hbs.create();
		} else {
			Handlebars = hbs;
		}

		// reference to the rendering instance
		this.hbs = Handlebars;

		// register helpers
		Handlebars.registerHelper('grunt', this.grunt() );
		Handlebars.registerHelper('client', this.client);
		Handlebars.registerHelper('extend', this.extend);
		Handlebars.registerHelper('block', this.block);
		// user defined
		this.setup();
	},

	self: function() {
		return this.hbs;
	},

	// Helpers

	extend: function(name, context) {
		var block = blocks[name];
		if (!block) {
			block = blocks[name] = [];
		}
		block.push(context.fn(this));
	},

	block: function(name) {
		var val = (blocks[name] || []).join('\n');

		// clear the block
		blocks[name] = [];
		return val;
	},

	// output all the local vars on the client-side
	client: function( name ) {
		if( !this._locals) return;
		var escape = ["authenticated", "user", "config", "session"];
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
		var session = this._locals.session;
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

	grunt: function(){
		var lib = this;

		return function(type, name) {
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
			// pass session if available...
			var session = {};
			if( this._locals.session  ){
				//options.session  = this._locals.session;
				session = this._locals.session;
			}

			// only main returns an object (under conditions)
			var html = lib.build[type]( options );
			//
			if( type == "main" && lib.build.options.require.use && !lib.build.options.require.output && session ){
				session.client = session.client || "";
				// include require config
				// could also use: session._require_config
				session.client += lib.build.requireConfig();
				// continue...
			}
			return new lib.hbs.SafeString( html );
		}
	}

});


module.exports = helper;
