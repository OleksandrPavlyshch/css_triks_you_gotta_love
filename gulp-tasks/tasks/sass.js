const gulp = require('gulp')
	, plumber = require('gulp-plumber')
	, postcss = require('gulp-postcss')
	, sass = require('gulp-sass')
	, sassGlob = require('gulp-sass-glob')
	, autoprefixer = require('autoprefixer')
	, mqpacker = require("css-mqpacker")
	, sourcemaps = require('gulp-sourcemaps')
	, gulpif = require('gulp-if')
	, configs = require('../configs')
	, isMax = (mq) => /max-width/.test(mq)
	, isMin = (mq) => /min-width/.test(mq)
	, sortMediaQueries = (a, b) => {
		let A = a.replace(/\D/g, '');
		let B = b.replace(/\D/g, '');

		if (isMax(a) && isMax(b)) {
				return B - A;
		} else if (isMin(a) && isMin(b)) {
				return A - B;
		} else if (isMax(a) && isMin(b)) {
				return 1;
		} else if (isMin(a) && isMax(b)) {
				return -1;
		}

		return 1;
};

//sass
gulp.task('sass', () => {

	let processors = [
		autoprefixer({
			browsers: ['last 2 version']
			, cascade: false
		})
		, mqpacker({
			sort: sortMediaQueries
		})
	];

	return gulp.src(configs.source.sass)
		.pipe(plumber())
		.pipe(gulpif(!configs.production, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: configs.production ? 'compact' : 'expanded'
			, precision: 5
		}))
		.on('error', configs.errorHandler)
		.pipe(postcss(processors))
		.pipe(gulpif(!configs.production, sourcemaps.write('./')))
		.pipe(gulp.dest(configs.build.css));
});

gulp.task('sass:watch', () => {
	gulp.watch(configs.source.sass, ['sass']);
});