'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').Server;
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');


/////////////// tasks ////////////////
gulp.task('connect', function() {
  connect.server();
});

gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function(done) {
  new karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./js/app.js', './js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('default', ['jshint', 'test', 'sass', 'scripts', 'styles', 'connect'], function() {

});
gulp.watch('./css/**/*.css', ['styles']);
gulp.watch('./scss/**/*.scss', ['sass']);

gulp.watch('./js/**/*.js', function() {
  gulp.run('scripts');
});
