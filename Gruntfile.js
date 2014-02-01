module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		// uglify : {
		// 	options : {
		// 		preserveComments : false,
		// 		banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		// 	},
		// }
		requirejs : {
			compile: {
    			options: {
      				baseUrl: "./js/",
      				mainConfigFile: "js/main.js",
      				name : "main",
      				preserveLicenseComments : false,
      				out: "js/<%= pkg.name %>.min.js"
    			}
  			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
	
};