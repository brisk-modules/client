var Main = require('brisk').getBaseController("main");

var controller = Main.extend({
	index: function(req, res){
		var self = this;

		// data is saved in the client...
		res.data = req.session.client || {};

		// render the page
		this.render( req, res );
	},

	render : function( req, res ){
		var body = res.data || "";
		// set expiration headers
		res.setHeader('Cache-Control', 'public, max-age=2'); // 2 sec
		res.setHeader('Expires', new Date(Date.now() + 2000).toUTCString());
		// MIME type
		res.header("Content-Type", "application/json");
		// validate the data before output...
		return res.send( body );
	}

});


module.exports = controller;
