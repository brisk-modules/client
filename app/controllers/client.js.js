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
		// validate the data before output...
		return res.send( body );
	}

});


module.exports = controller;
