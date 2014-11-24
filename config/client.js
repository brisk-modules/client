// enviroment state
var DEV = (process.env.NODE_ENV == "production") ? false : true;

module.exports = {

	minify: {
		use : false,
		mangle: true
	},
	less: {
		use : false
	},
	require: {
		use : false,
		output:  ( DEV ) ? true : false  // also monitor deploy.debug?
	}
	//, cdn     : ''
	//, ssl        : false
}
