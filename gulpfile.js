var gulp = require('gulp'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename"),
  s3 = require( "gulp-s3" ),
  fs = require('fs'),
  path = require('path'),
  opn = require('opn');


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

gulp.task('build', ['copy-bower', 'html', 'css', 'js']);

/** default */
gulp.task('default', ['build', 'connect', 'watch']);




const credentialsPath = './s3Credentials.json';
const pathProduction = "http://especialess3.lanacion.com.ar/";

gulp.task('deploy', ['build'], function () {

    var options = {
            uploadPath: '17/calculadora-ganancias2018/'
        }

    var s3Credentials = JSON.parse(fs.readFileSync(credentialsPath));

    gulp.src('**', { cwd: "dist" })
        .pipe(s3(s3Credentials, options))
        .on('end', function(e){
            let urlProductionApp = path.join(pathProduction, options.uploadPath);
            console.log( "Deploy complete on: \n" +  urlProductionApp);
            opn(urlProductionApp);
        });

});
