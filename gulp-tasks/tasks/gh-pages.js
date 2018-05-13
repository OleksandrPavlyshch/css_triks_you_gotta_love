const gulp = require('gulp')
	, deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
	return gulp.src("./build/**/*")
		.pipe(deploy());
});
