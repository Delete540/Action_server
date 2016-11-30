var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    rev = require('gulp-rev');
    reCollector = require('gulp-rev-collector'); 
    clean = require('gulp-clean'); 
    server = require('gulp-express');
    gulpsync = require('gulp-sync')(gulp);
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', gulpsync.sync(['build:server', 'build:static']));

gulp.task('build:css', function () {
    gulp.src(['public/stylesheets/style.less']) 
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        .pipe(sourcemaps.write('/',{addComment: false}))
        .pipe(gulp.dest('public/build/css'))
        //.pipe(rev())
        
        //.pipe(rev.manifest())                       //给添加哈希值的文件添加到清单中
        //.pipe(gulp.dest('public/build/css'));
});

gulp.task('build:clean',function(){
    gulp.src(['public/build'], {read: false}) //这里设置的dist表示删除dist文件夹及其下所有文件
        .pipe(clean());
});

//gulp.task('build:css-version',function(){
   // gulp.src(['public/build/**/*.json','public/stylesheets/*.less','public/stylesheets/**/*.less'])
   // .pipe(reCollector())
   // .pipe(gulp.dest('public/stylesheets'));
//});

//gulp.task('build:redir',function(){
    //gulp.src(['public/build/**/*.json','views/*.html','views/**/*.html'])
        //.pipe(reCollector({
            ////replaceReved: true,  //模板中已经被替换的文件是否还能再被替换,默认是false
            //dirReplacements: {   //标识目录替换的集合, 因为gulp-rev创建的manifest文件不包含任何目录信息,
               // '/build/css/': '/build/css',
               // '/build/js/': '/build/js'
            //}
        //}))
       // .pipe(gulp.dest('views'))
//});

gulp.task('build:server', function () {
    server.run(['bin/www']);
    gulp.watch(['app.js','routes/*.js','routes/**/*.js','proxy/*.js','task/*.js','module/*.js','middleware/*.js'], [server.run]);
    
});
gulp.task('build:static', function () {
    gulp.watch('public/stylesheets/**/*.less', ['build:clean','build:css']); //当所有less文件发生改变时，调用testLess任务
});