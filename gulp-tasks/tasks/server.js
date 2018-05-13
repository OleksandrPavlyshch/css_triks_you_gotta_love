const gulp = require('gulp')
	, browserSync = require('browser-sync').create('server')
	, configs = require('../configs');

// server
gulp.task('server', () => {
	browserSync.init({
		server: {
			baseDir: configs.build.root
			, directory: false
		}
		, files: [
			configs.build.root + '**/*.html',
			configs.build.css + '**/*.css',
			configs.build.js + '**/*.js',
			configs.build.img + '**/*'
		]
		, logLevel: 'info' // 'debug', 'info', 'silent', 'warn'
		, logFileChanges: true
		, logConnections: false
		, open: 'local' //local, external, ui, ui-external, tunnel or false
		, ghostMode: {
			clicks: true
			, forms: true
			, scroll: true
		}
		, online: true
		// , tunnel: 'public'
	});
});

