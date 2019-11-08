'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var config = {
    app: 'app',
    dist: 'dist'
  }

  grunt.initConfig({

    config: config,

    copy: {
      // dist: {
      //   files: {
      //     '<%= config.dist %>/index.html': '<%= config.app %>/index.html',
      //     '<%= config.dist %>/js/index.js': ['<%= config.app %>/js/index.js'],
      //   },
      // },

      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: '**/*.html',
          dest: '<%= config.dist %>/',
          ext: '.min.html',
          extDot: 'last',
          flatten: true,
          rename: function(dest, src) {
            return dest + 'rider/' + src;
          }
        }, {
          expand: true,
          cwd: '<%= config.app %>/',
          src: '**/*.js',
          dest: '<%= config.dist %>/',
          ext: '.min.map',
          extDot: 'last',
          flatten: false,
          rename: function(dest, src) {
            return dest + 'saber/' + src;
          }
        }],
      },
    },

    clean: {
      dist: {
        // src: ['<%= config.dist %>/index.html', '<%= config.dist %>/js/index.js']
        src: ['<%= config.dist %>/**/*'],

        // common useage for filter
        filter: function(filepath) {
          return (!grunt.file.isDir(filepath));
        },

        // nodejs usage for filter
        // filter: 'isFile',
        // ==========================================
        // more filter usage
        // dot: true
        // matchBase: true     a?b  /xyz/123/axb (√)    /xyz/axb/123 (×)
      },
    }

  });
}
