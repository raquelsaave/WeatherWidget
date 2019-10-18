const path = require("path");
module.exports = {
	entry: {
		home: "./src/js/pages/home.js"
	},
	output: {
		path: path.resolve(__dirname, "assets/js"),
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: "babel-loader"
			}
		}]
	}
};