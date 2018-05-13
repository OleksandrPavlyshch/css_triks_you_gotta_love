const gulp = require('gulp')
	, nunjucksRender = require('gulp-nunjucks-render')
	, plumber = require('gulp-plumber')
	, gulpif = require('gulp-if')
	, changed = require('gulp-changed')
	, prettify = require('gulp-prettify')
	, frontMatter = require('gulp-front-matter')
	, configs = require('../configs');

function renderHtml(onlyChanged){
	nunjucksRender.nunjucks.configure({
		watch: false,
		trimBlocks: true,
		lstripBlocks: false
	});

	return gulp
		.src([configs.source.nunjucks + '/[^_]*.html'])
		.pipe(plumber({
			errorHandler: configs.errorHandler
		}))
		.pipe(gulpif(onlyChanged, changed(configs.build.root)))
		.pipe(frontMatter({ property: 'data' }))
		.pipe(nunjucksRender({
			PRODUCTION: configs.production,
			path: [configs.source.root]
		}))
		.pipe(prettify({
			indent_size: 2,
			wrap_attributes: 'auto',
			preserve_newlines: false,
			end_with_newline: true
		}))
		.pipe(gulp.dest(configs.build.root));
}

gulp.task('nunjucks', function() {
	return renderHtml();
});

gulp.task('nunjucks:changed', function() {
	return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
	gulp.watch([
		configs.source.nunjucks + '/**/[^_]*.html'
	], ['nunjucks:changed']);

	gulp.watch([
		configs.source.nunjucks + '/_*.html', configs.source.root + 'elements/**/*.html'
	], ['nunjucks']);
});
