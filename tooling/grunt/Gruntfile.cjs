module.exports = (grunt) => {
  grunt.initConfig({
    clean: { dist: ['dist'] },
    copy: { app: { expand: true, cwd: 'app', src: ['**/*'], dest: 'dist' } },
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['clean', 'copy']);
};
