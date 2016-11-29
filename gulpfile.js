var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css');
 
gulp.task('buildLess', function () {
    gulp.src(['public/stylesheets/style.less']) 
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('public/build'));
});

gulp.task('buildWatch', function () {
    gulp.watch('public/stylesheets/**/*.less', ['buildLess']); //当所有less文件发生改变时，调用testLess任务
});