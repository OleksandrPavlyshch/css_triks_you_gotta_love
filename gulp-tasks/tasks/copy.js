const gulp = require('gulp')
	, filter = require('gulp-filter')
	, plumber = require('gulp-plumber')
	, gulpif = require('gulp-if')
	, uglify = require('gulp-uglify')
	, cleanCSS = require('gulp-clean-css')
	, configs = require('../configs');

// fonts
gulp.task('copy:fonts', () => {
	gulp.src(configs.source.fonts)
	.pipe(filter(['**/*.ttf', '**/*.eot', '**/*.woff', '**/*.woff2', '**/*.svg']))
	.pipe(gulp.dest(configs.build.fonts));
});

gulp.task('copy:vendor:js', () => {
	gulp.src(configs.source.vendorJs + '*.js')
	.pipe(plumber())
	.pipe(gulpif(configs.production, uglify()))
	.pipe(gulp.dest(configs.build.vendorJs));
});
gulp.task('copy:vendor:css', () => {
	gulp.src(configs.source.vendorCss + '*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest(configs.build.vendorCss));
});

gulp.task('copy', [
	'copy:fonts', 'copy:vendor:js', 'copy:vendor:css'
]);