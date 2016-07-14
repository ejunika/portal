module.exports = function( grunt ) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        cssmin : {
            target : {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                },
                files : {
                    'build/app.style.min.css': [ 'css/app.style.css' ]
                }
            }
        },
        uglify: {
            target: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    sourceMap: true
                },
                files: {
                    'build/test-app.min.js': [ 'src/test-app.js' ],
                    'build/app.min.js': [ 
                        'ngApp/app-config.js',
                        'ngApp/utility/*.js',
                        'ngApp/**/*.module.js',
                        'ngApp/**/*.ctrl.js',
                        'ngApp/**/*.dir.js',
                        'ngApp/**/*.srvc.js',
                        'ngApp/boot.js'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.registerTask( 'default', [ 'uglify', 'cssmin' ] );
};