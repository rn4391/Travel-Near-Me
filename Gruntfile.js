module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		requirejs : {
			compile: {
    			options: {
      				baseUrl: "./js/",
      				mainConfigFile: "js/main.js",
      				name : "main",
      				preserveLicenseComments : false,
      				paths: {
						requireLib : 'libs/require'
					},
				include : 'requireLib',
      				out: "js/<%= pkg.name %>.min.js"
    			}
  			}
		},
		less : {
			production: {
			    options: {
			    	paths: ["css"],
			    	cleancss: true
			    },
			    files: {
			    	"css/style.css": "css/style.less"
			    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['requirejs','less']);
	
};
