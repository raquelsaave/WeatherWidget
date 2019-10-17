const sass = require("node-sass");
/*global module:false*/
module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		watch: {
		},
		stylelint: {
			all: ["src/scss/*.scss","src/scss/ui/*.scss"]
		},
		sass: {
			options: {
				implementation: sass,
				sourceMap: true
			},
			dist: {
				src: ["main.scss"],
				dest: "assets/css",
				ext: ".css",
				cwd: "src/scss",
				expand: true
			},
		},
		eslint: {
			target: ["src/js/components/*.js","src/js/pages/*.js","src/js/services/*.js"]
		}

	});

	grunt.loadNpmTasks("grunt-stylelint");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-eslint");

	// Default task.
	grunt.registerTask("default", ["stylelint", "sass", "eslint"]);
};