// enviroment state
var DEV = (process.env.NODE_ENV == "production") ? false : true;

module.exports = {

	minify: {
		use : true,
		mangle: true
	},
	less: {
		use : true
	},
	require: {
		use : true,
		output:  ( DEV ) ? true : false  // also monitor deploy.debug?
	}
	//, cdn     : ''
	//, ssl        : false
}
