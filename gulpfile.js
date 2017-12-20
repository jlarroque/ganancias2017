var gulp = require('gulp'),
  connect = require('gulp-connect');


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
    .pipe(gulp.dest("dist"))
    // .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./js/calc.js')
  //minifi js
    .pipe(gulp.dest("dist"))
    // .pipe(connect.reload());
});


/** copy bower */
gulp.task('copy-bower', function () {
  gulp.src('./bower_components/**/*')
    .pipe(gulp.dest("dist/bower_components"));
});


/** default */
gulp.task('default', ['copy-bower', 'css', 'connect', 'watch']);