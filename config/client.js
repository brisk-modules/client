// enviroment state
var DEV = (process.env.NODE_ENV == "production") ? false : true;

module.exports = {
	isolation: false,
	minify: {
		use : false,
		mangle: true
	},
	less: {
		use : false,
		lib: "https://cdnjs.cloudflare.com/ajax/libs/less.js/4.4.0/less.min.js"
	},
	require: {
		use : false,
		prefix: "_", // prefix groups with an underscore (TBA)
		output: ( ( DEV ) ? true : false ),  // also monitor deploy.debug?
		lib: "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.7/require.min.js"
	}
	//, cdn     : ''
	//, ssl        : false
}
