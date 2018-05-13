const gulp = require('gulp');

gulp.task('watch',
	[
		'nunjucks:watch'
		, 'sass:watch'
		, 'scripts:watch'
		, 'images:watch'
		, 'sprite:svg:watch'
	]
);