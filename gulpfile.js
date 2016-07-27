/**
 gulp配置文件  add by sunzhimin
 */

var gulp = require('gulp');
var watch = require('gulp-watch');
//const babel = require('gulp-babel');
//var sourcemaps = require("gulp-sourcemaps");
//var concat = require("gulp-concat");

var jsUrl = 'lib/*.js';   //js 文件路径
var jsPut = 'dist';  //js  压缩后文件路径


gulp.task('es6', function() {
  gulp.src( jsUrl )
    .pipe(watch( jsUrl ))
    //.pipe(sourcemaps.init())
    //.pipe(babel({
    //  presets: ['es2015']
    //}))
    //.pipe(concat('all.js'))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest( jsPut ));
});

gulp.task('default', [ 'es6']);
//gulp.task('default', ['less2css', 'post-css','minify-css', 'compress']);
