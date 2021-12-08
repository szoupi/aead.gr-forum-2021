// https://github.com/CodeChron/browsersync-gulp-4-express/blob/master/gulpfile.js

var gulp = require('gulp')
var browserSync = require('browser-sync').create()

// style requirements
// var sass = require('gulp-sass')

//Gulp-sass does not support @use, use gulp-dart-sass instead
var sass = require('gulp-dart-sass') 
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps') // maps to original files
var concat = require('gulp-concat')
var cleanDest = require('gulp-clean-dest')





// dist is the distribution folder
var paths = {
	// copyFilesDist: {
	// 	src: './*.html',
	// 	dest: './dist/'
	// },
	styles: {
		src: './scss/**/*.scss',
		dest: './assets/css' 
	}
	// stylesDist: {
	// 	src: './sass/**/*.scss',
	// 	dest: './dist/css'
	// },
	// images: {
	// 	src: './img-raw/**/*.{jpg,png}',
	// 	dest: './img'
	// },
	// imagesWebp: {
	// 	src: './img-raw/**/*.{jpg,png}',
	// 	dest: './img-raw'
	// },
	// scripts: {
	// 	src: './js/**/*.js',
	// 	dest: './js/'
	// },
	// scriptsDist: {
	// 	src: './js/**/*.js',
	// 	dest: './dist/js/'
	// }
	// gzip: {
	// 	src: 'js/**/*.{html,xml,json,css,js}',
	// 	dest: './js/'
	// 	options: {}
	// },

}

/*
 * Define tasks using plain functions
 */
function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.init({
			loadMaps: true
		})) // Strip inline source maps
		// .pipe(sass({
		// 	outputStyle: 'compressed'
		// }))
		.pipe(concat('css/style.css'))
		.pipe(sourcemaps.write())
		.pipe(cleanDest(paths.styles.dest))
		.pipe(gulp.dest('assets'))
		.pipe(browserSync.stream())
}


function watch() {
	//watch the styles folder and execute styles func
	gulp.watch(paths.styles.src, styles).on('change', browserSync.reload)
	gulp.watch('./**/*.{html,js,php,twig,yaml,scss}').on('change', browserSync.reload)
}

function browserSyncInit() {
	browserSync.init({
		proxy: 'http://localhost/aead.gr-forum-2021', 
		browser: "firefox"
	});

}


/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('styles', styles, watch);
// gulp.task('images', gulp.series(convertToWebp, copyWebpToImg, responsiveImages));
gulp.task('default', gulp.series(gulp.parallel(watch, browserSyncInit)));
