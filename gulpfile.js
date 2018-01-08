var gulp = require('gulp');
var rm = require('del');
var sass = require('gulp-sass');
var imageMin = require('gulp-imagemin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();/*本地服务器并且多浏览器自动刷新*/
var reload = browserSync.reload;
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

/*message  gulp打印运行提示*/

gulp.task('message',function(){
	console.log("gulp is runing")
});


/*文件复制  复制移动*/
gulp.task('cloneFile',function(){
	gulp.src(['./src/{css,js,lib,fonts,page}/*','./src/*.html'])
		.pipe(gulp.dest('./dist'))
		
});

/*压缩imgage*/
gulp.task('imageMin',function(){
    gulp.src('./src/img/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/img'))
        
});

gulp.task('dist',['message','clear-dist','cloneFile','imageMin']);

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src('./src/sass/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(reload({stream: true}));
});

/*默认任务*/
gulp.task('default',['sass'] ,function(){
	
		browserSync.init({
        server:{
        	baseDir: './src',
        	index:''
        }
    });
	
	  gulp.watch('./src/sass/**/*', ['sass']);
	  gulp.watch('./src/**/*.html').on("change",reload);
	  gulp.watch('./src/js/**/*').on("change",reload);
	  gulp.watch('./src/img/**/*').on("change",reload);
	  // Other watchers
});
