module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('aws.json'),
       
        processhtml : {
            dist : {
                options : {
                    process: true
                },
                files : {
                    'dist/index.html' : ['index.html']
                }
            }
        },

        cssmin : {
            "dist/css/app.min.css" : ["dist/css/app.css"]
        },

        copy : {
            dist : {
                files : [
                    { src: "images/**", dest : "dist/" }
                ]
            }
        },

        s3: {
            options : {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                bucket: '<%= aws.AWS_S3_BUCKET %>',
                access: 'public-read'
            },
            dist: {
                cwd: "dist/",
                src: "**"
            },
        },

        clean: {
            build: {
                src: [ "dist/**" ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-aws');

    grunt.registerTask(
        'build',
        'compiles all source, minifies css, copies to ./dist',
        [ "clean:build", "cssmin", "processhtml:dist", "copy:dist" ]
    );

    grunt.registerTask(
        "deploy",
        "deploys to s3",
        [ "s3:dist" ]
    );
};

