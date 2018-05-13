const gulp = require('gulp')
	, mainBowerFiles = require('main-bower-files')
	, plumber = require('gulp-plumber')
	, uglify = require('gulp-uglify')
	, bower = require('gulp-bower')
	, runSequence = require('run-sequence')
	, cleanCSS = require('gulp-clean-css')
	, wiredep = require('wiredep').stream
	, configs = require('../configs');


// install bower packeges
gulp.task('install-bower-packeges', () => bower());

let getFilename = (path) => {
	let pathArray = path.split('/');
	let fileName = pathArray[pathArray.length - 1];
	return fileName;
};

//add gulp dependency ot html
gulp.task('wiredep', () => {
	gulp.src(configs.source.nunjucks + '/**/*.html')
	.pipe(plumber())
		.pipe(wiredep({
			devDependencies: true
			, fileTypes: {
				html: {
					block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
					detect: {
						js: /<script.*src=['"]([^'"]+)/gi,
						css: /<link.*href=['"]([^'"]+)/gi
					},
					replace: {
						js(filePath) {
							let fileName = getFilename(filePath);
							console.log(fileName);
							return '<script src="js/vendor/' + fileName + '"></script>';
						}
						, css(filePath) {
								let fileName = getFilename(filePath);
								return '<link rel="stylesheet" href="css/vendor/' + fileName + '" />';
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(configs.source.nunjucks));
});

// vendor-js
gulp.task('vendor-js', () => gulp.src(mainBowerFiles('**/*.js'))
.pipe(plumber())
.pipe(uglify())
.pipe(gulp.dest(configs.build.vendorJs)));

// vendor-js
gulp.task('vendor-css', () => gulp.src(mainBowerFiles('**/*.css'))
.pipe(cleanCSS({compatibility: 'ie8'}))
.pipe(gulp.dest(configs.build.vendorCss)));


gulp.task('bower', () => {
	runSequence('install-bower-packeges', 'vendor-js', 'vendor-css', 'wiredep');
});