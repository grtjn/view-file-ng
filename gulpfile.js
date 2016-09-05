/*jshint node: true */

'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    html2Js = require('gulp-ng-html2js'),
    info = require('gulp-print'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    flatten = require('gulp-flatten'),
    webserver = require('gulp-webserver');

gulp.task('clean', function () {
  return gulp.src([
      'index*.html',
      'scripts/*',
      'styles/*',
      'images/*',
      'fonts/*'
    ], {read: false})
    .pipe(info(function(filepath) {
      return 'deleting: ' + filepath;
    }))
    .pipe(clean());
});

gulp.task('templates', ['clean'], function() {
  return gulp.src([
      'src/**/*.html',
      '!src/index.html'
    ])
    .pipe(info(function(filepath) {
      return 'minifying: ' + filepath;
    }))
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(html2Js({
      moduleName: 'viewFileNgDemo.Tpls',
      prefix: '/'
    }))
    
    .pipe(concat('main-tpls.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
    
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('copy-index', ['templates'], function () {
  return gulp.src([
      'src/index.html'
    ])
    .pipe(info(function(filepath) {
      return 'copying: ' + filepath;
    }))
    .pipe(gulp.dest('./'))
    .pipe(rename({suffix: '-dev'}))
    .pipe(replace(/@suffix/g, ''))
    .pipe(gulp.dest('./'));
});

gulp.task('minify', ['copy-index'], function () {
  var assets = useref.assets();
  var wiredep = require('wiredep').stream;
  
  return gulp.src([
      'index*.html'
    ])
    .pipe(replace(/@suffix/g, '.min'))
    .pipe(gulp.dest('./')) // This makes sure wiredep can properly inject all dependencies!
    .pipe(wiredep())
    .pipe(info(function(filepath) {
      return 'processing: ' + filepath;
    }))

    .pipe(assets)
    .pipe(info(function(filepath) {
      return 'minifying: ' + filepath;
    }))
    .pipe(gulpif('*.min.css', sourcemaps.init()))
    .pipe(gulpif('*.css', less()))
    .pipe(gulpif('*.min.css', minifyCss()))
    .pipe(gulpif('*.min.css', sourcemaps.write()))
    .pipe(gulpif('*.min.js', uglify()))
    .pipe(assets.restore())

    .pipe(useref())
    .pipe(gulp.dest('./'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('images', ['minify'], function () {
  return gulp.src([
      'bower_components/**/images/**/*.*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./images/'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('videogular-fonts', ['images'], function () {
  return gulp.src([
      'bower_components/**/fonts/**/videogular.*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./styles/fonts/'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('fonts', ['videogular-fonts'], function () {
  return gulp.src([
      'bower_components/**/fonts/**/*.*',
      '!bower_components/**/fonts/**/videogular.*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./fonts/'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('watch', function() {
  gulp.watch([
    'bower_components/**/*.*',
    'src/**/*.*'
  ], ['default']);
});

gulp.task('test', ['default', 'watch'], function() {
  gulp.src('./')
    .pipe(webserver({
      path: '/view-file-ng/',
      livereload: true,
      directoryListing: false,
      open: '/view-file-ng/index-dev.html'
    }));
});

gulp.task('default', ['fonts']);
