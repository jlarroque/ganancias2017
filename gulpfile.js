var gulp = require('gulp'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename");


/** server */
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});
 
 
gulp.task('watch', function () {
  gulp.watch(['./pages/*.html'], ['html']);
});
 
gulp.task('html', function () {
  gulp.src('./pages/*.html')
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./pages/**/*.css')
    .pipe(gulp.dest("dist"));

});

gulp.task('js', function () {
  gulp.src('./js/calc.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("dist/js"));

});


/** copy bower */
gulp.task('copy-bower', function () {
  gulp.src('./bower_components/**/*')
    .pipe(gulp.dest("dist/bower_components"));
});


/** default */
gulp.task('default', ['copy-bower', 'html', 'css', 'js', 'connect', 'watch']);