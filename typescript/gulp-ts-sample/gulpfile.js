/* node side */
/* var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
}); */


/* browser side */
/* var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('copy-html'), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}); */


/* watchify */
/* var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
}

gulp.task('default', gulp.series('copy-html', bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log); */


/* uglify + sourcemaps */
/* var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
  pages: ['src/*.html']
};

gulp.task("copy-html", function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series('copy-html'), function() {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/main.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist"));
}); */


/* babel */
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
  pages: ['src/*.html']
};

gulp.task('copy-html', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('copy-html'), function() {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/main.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});
