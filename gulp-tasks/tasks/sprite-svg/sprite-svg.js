const gulp = require("gulp")
	, plumber = require('gulp-plumber')
	, svgSprite = require('gulp-svg-sprite')
	, svgmin = require('gulp-svgmin')
	, cheerio = require('gulp-cheerio')
	, replace = require('gulp-replace')
	, configs = require('../../configs');


gulp.task('sprite:svg', () => gulp.src(configs.source.iconsSvg + '*svg')
	.pipe(plumber({
			errorHandler: configs.errorHandler
	}))
// minify svg
	.pipe(svgmin({
			js2svg: {
					pretty: true
			}
	}))
	// remove all fill, style and stroke declarations in out shapes
	.pipe(cheerio({
			run($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
			}
	}))
	// cheerio plugin create unnecessary string '&gt;', so replace it.
	.pipe(replace('&gt;', '>'))
	// build svg sprite
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: '../img/sprite.svg',
				render: {
					scss: {
						dest: '../../source/sass/_sprite-svg.scss'
						, template: './gulp-tasks/tasks/sprite-svg/_sprite-svg-template.scss'
					}
				}
			}
		}
	}))
	.pipe(gulp.dest(configs.build.root)));


gulp.task('sprite:svg:watch', function() {
		gulp.watch(configs.source.iconsSvg + '/*.svg', ['sprite:svg']);
});
