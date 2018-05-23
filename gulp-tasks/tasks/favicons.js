const configs = require('../configs')
	, gulp = require('gulp')
	, favicons = require('gulp-favicons')
	, plumber = require('gulp-plumber')
	, filter = require('gulp-filter')
	, htmlName = 'favicons'
	, fs = require('fs')
	, appName = JSON.parse(fs.readFileSync('./package.json')).name;

gulp.task('favicons', () => {

const onlyFaviconFilter = filter(['**', '!' + htmlName + '.html'], {restore: true})
	, onlyPNGFilter = filter(['**/*.png'], {restore: true});

	return gulp.src(configs.source.favicon)
		.pipe(plumber())
		.pipe(onlyPNGFilter)
		.pipe(favicons({
			appName: appName
			, appDescription: appName
			, developerName: appName
			, developerURL: appName
			, background: 'transpatent'
			, path: './favicon/' //http://example.com/favicon'
			, url: appName
			, display: 'standalone'
			, orientation: 'portrait'
			, start_url: '/?homescreen=1'
			, version: 1.0
			, logging: false
			, online: false
			, html: '_' + htmlName + '.html'
			, pipeHTML: true
			, replace: true
		}))
		.pipe(onlyPNGFilter.restore)
		.pipe(onlyFaviconFilter)
		.pipe(gulp.dest(configs.build.favicon))
		.pipe(onlyFaviconFilter.restore)
		.pipe(filter('**/*.html'))
		.pipe(gulp.dest(configs.source.root + '/nunjucks-templates/partials/'));
});
