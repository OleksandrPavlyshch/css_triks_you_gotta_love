const gulp = require('gulp')
	, configs = require('../configs')
	, runSequence = require('run-sequence');

gulp.task('build', () => {
	configs.setEnv('production');
	configs.logEnv();
	runSequence(['favicons', 'copy', 'scripts', 'sprite:svg', 'images'], 'sass', 'nunjucks');
});
