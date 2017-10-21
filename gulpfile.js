var gulp = require('gulp');
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
gulp.task('cloneHtml',function(){
	gulp.src(['src/**/*.html'])
		.pipe(gulp.dest('dist'))
		
});
gulp.task('cloneLib',function(){
	gulp.src(['src/lib/*'])
		.pipe(gulp.dest('dist/lib'))
		
});
gulp.task('cloneFonts',function(){
	gulp.src(['src/fonts/*'])
		.pipe(gulp.dest('dist/fonts'))
		
});
gulp.task('cloneJs',function(){
	gulp.src(['src/js/**/*'])
		.pipe(gulp.dest('dist/js'))
		
});
gulp.task('cloneCss',function(){
	gulp.src(['src/css/**/*'])
		.pipe(gulp.dest('dist/css'))
		
});
/*转换sass*/
gulp.task('sass',function(){
	gulp.src('src/sass/*.+(scss|sass|css)')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
	      stream: true
	    }))
});
/*压缩imgage*/
gulp.task('imageMin',function(){
    gulp.src('src/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        
});

/*默认任务*/
gulp.task('default',['message','cloneHtml','cloneLib','cloneFonts','cloneJs','cloneCss','imageMin']);

gulp.task('watch',['browserSync','sass','imageMin'] ,function(){
	  gulp.watch('src/sass/**/*.scss', ['sass']);
	  gulp.watch('src/**/*.html', browserSync.reload);
	  gulp.watch('src/js/**/*', browserSync.reload);
	  gulp.watch('src/img/**/*', browserSync.reload);
	  // Other watchers
})