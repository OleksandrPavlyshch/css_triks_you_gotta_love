const gulp = require('gulp')
	, plumber = require('gulp-plumber')
	, uglify = require('gulp-uglify')
	, gulpif = require('gulp-if')
	, concat = require('gulp-concat')
	, configs = require('../configs')
	, jsFileName = "app.js";

//scripts
gulp.task('scripts', () => {
	return gulp.src(configs.source.js)
		.pipe(plumber())
		.pipe(gulpif(configs.production, uglify()))
		.pipe(concat(jsFileName))
		.pipe(gulp.dest(configs.build.js));
});

gulp.task('scripts:watch', () => {
	gulp.watch(configs.source.js, ['scripts']);
	gulp.watch(configs.source.vendorJs + '*.js', ['copy:vendor:js']);
});