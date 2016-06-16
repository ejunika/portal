module.exports = function( grunt ) {
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				sourceMap: true,
				sourceMapName: 'build/sourcemap.map'
			},
			build: {
				src: 'src/test-app.js',
				dest: 'build/test-app.min.js'
			}
		}
	});
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.registerTask( 'default', [ 'uglify' ] );
}

	