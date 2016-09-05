/*jshint node: true */

'use strict';

var projectName = 'view-file-ng';
var moduleName = 'view.file';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    html2Js = require('gulp-ng-html2js'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    minifyHtml = require('gulp-htmlmin'),
    path = require('path'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    info = require('gulp-print'),
    rm = require('gulp-rm'),
    ghpages = require('gulp-gh-pages'),
    cp = require('child_process');

gulp.task('jshint', function() {
  return gulp.src([
      './gulpfile.js',
      './src/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('templates', ['jshint'], function() {
  return gulp.src([ './src/**/*.html' ])
    .pipe(info(function(filepath) {
      return 'processing: ' + filepath;
    }))
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(html2Js({
      moduleName: moduleName+'.tpls',
      prefix: '/'+projectName+'/'
    }))
    .pipe(concat(projectName+'-tpls.js'))
    .pipe(gulp.dest('build'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('scripts', ['templates'], function() {
  return gulp.src([
      './src/'+projectName.replace('-ng','')+'.module.js',
      './src/**/*.js',
      './build/**/*.js'
    ])
    .pipe(info(function(filepath) {
      return 'processing: ' + filepath;
    }))
    .pipe(concat(projectName+'.js'))
    .pipe(gulp.dest('dist'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
    
    .pipe(rename(projectName+'.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('styles', ['scripts'], function() {
  return gulp.src([
      './less/**/*.less'
    ])
    .pipe(info(function(filepath) {
      return 'processing: ' + filepath;
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat(projectName+'.css'))
    .pipe(gulp.dest('dist'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
    
    .pipe(rename(projectName+'.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(info(function(filepath) {
      return 'writing: ' + filepath;
    }))
  ;
});

gulp.task('test', function() {
  karma.start({
    configFile: path.join(__dirname, './karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});

gulp.task('autotest', function() {
  karma.start({
    configFile: path.join(__dirname, './karma.conf.js'),
    autoWatch: true
  }, function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    //process.exit(exitCode);
  });
});

gulp.task('docs', function() {
  cp.exec('./node_modules/.bin/jsdoc -c jsdoc.conf.json', function(err) {
    if (err) {
      return console.log(err);
    }
  });
});

gulp.task('clean-docs', function() {
  return gulp.src('./docs/api/**/*', { read: false })
  .pipe(rm({async: false}));
});

gulp.task('publish-docs', function() {
  return gulp.src([ './docs/**/*.*' ])
  .pipe(ghpages({ remove: false }));
});

gulp.task('default', ['styles']);
