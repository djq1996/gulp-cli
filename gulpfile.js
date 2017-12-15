var gulp = require('gulp');
var rm = require('del');
var sass = require('gulp-sass');
var imageMin = require('gulp-imagemin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');/*本地服务器并且多浏览器自动刷新*/
/*
  -- 常用的方法 --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

/*清除产出目录*/
gulp.task('clear-dist', function() {
    rm.sync(['./dist/**']);
})

/*本地服务器任务*/
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src'
    },
  })
})
/*message  gulp打印运行提示*/

gulp.task('message',function(){
	console.log("gulp is runing")
});

/*文件复制  复制移动*/
gulp.task('cloneFile',function(){
	gulp.src(['./src/{css,js,lib,fonts,page}/**/*','./src/*.html'])
		.pipe(gulp.dest('./dist'))
		
});

/*转换sass*/
gulp.task('sass',function(){
	gulp.src('./src/sass/**/*.+(scss|sass|css)')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/css'))
		.pipe(browserSync.reload({
	      stream: true
	    }))
});
/*压缩imgage*/
gulp.task('imageMin',function(){
    gulp.src('./src/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/img'))
        
});

/*默认任务*/
gulp.task('dist',['message','clear-dist','cloneFile','imageMin']);

gulp.task('default',['browserSync','sass'] ,function(){
	  gulp.watch('./src/sass/**/*.scss', ['sass']);
	  gulp.watch('./src/**/*.html', browserSync.reload);
	  gulp.watch('./src/js/**/*', browserSync.reload);
	  gulp.watch('./src/img/**/*', browserSync.reload);
	  // Other watchers
})