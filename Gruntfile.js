'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  var config = {
        app: 'app'
    };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
            port: 9000,
            open: true,
            livereload: 35729,
            base: 'app',
            hostname: '0.0.0.0'
        },
      }
    },
    watch: {
      options: {
        livereload: true
      },
      target: {
        files: ['app/{,*/}*.html', 'app/styles/{,*/}*.css', 'app/scripts/{,*/}*.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);
};
