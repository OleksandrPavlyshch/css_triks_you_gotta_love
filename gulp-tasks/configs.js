let util = require('gulp-util')
	, production = util.env.production || util.env.prod || false
	, soursePath = './source/'
	, buildPath = './build/'
	, configs = {
		env: 'development'
		, production: production
		, 'source': {
				'root': soursePath
				//vendors
				, 'vendorJs': soursePath + 'vendor/js/'
				, 'vendorCss': soursePath + 'vendor/css/'
				// js
				, 'js': soursePath + 'elements/**/*.js'
				, 'pagelist': soursePath + 'index.yaml'
				, 'favicon': soursePath + 'favicon/**/*.png'
				, 'fonts': soursePath + 'fonts/**/*'
				//Pug
				, 'pug': soursePath + 'pug-templates/*.pug'
				, 'pugLayout': soursePath + 'pug-templates/layout/'
				, 'pugJson': soursePath + 'pug-templates/jsons/index.json'
				, 'pug_watch': [soursePath + 'pug-templates/**/*.pug', soursePath + 'pug-templates/**/*.json', soursePath + 'elements/**/*.pug', soursePath + 'elements/**/*.json']
				//Nunjucks
				,'nunjucks': soursePath + 'nunjucks-templates'
				//Sass
				, 'sass': [soursePath + 'sass/**/*.+(sass|scss)', soursePath + 'elements/**/*.+(sass|scss)']
				, 'sassFolder': soursePath + 'sass/'
				//images
				, 'img': soursePath + 'img/*.*'
				//icons
				, 'iconsSvg': soursePath + 'svg-icons/'
				, 'svgFontsAssets': soursePath + 'svg-font-assets/*.svg'
		}
		, 'build': {
				'root': buildPath
				, 'vendorJs': buildPath + 'js/vendor/'
				, 'vendorCss': buildPath + 'css/vendor/'
				, 'css': buildPath + 'css/'
				, 'js': buildPath + 'js/'
				, 'fonts': buildPath + 'fonts/'
				, 'img': buildPath + 'img/'
				, 'favicon': buildPath + 'favicon'
		}
		, setEnv: (env) => {
				if (typeof env !== 'string') return;
				this.env = env;
				configs.production = env === 'production';
				process.env.NODE_ENV = env;
		}
		, logEnv: () => {
				util.log(
						'Environment:',
						util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
				);
		}
		, errorHandler: require('./util/handle-errors')
};

configs.setEnv(production ? 'production' : 'development');

module.exports = configs;