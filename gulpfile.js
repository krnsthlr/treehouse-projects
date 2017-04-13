'use strict';

const gulp = require('gulp'),
	   del = require('del'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),	  
	  sass = require('gulp-sass'),
	  csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
	  maps = require('gulp-sourcemaps'),
	inject = require('gulp-inject'),
	runSeq = require('run-sequence'),
	reload = require('gulp-livereload'),
  browSync = require('browser-sync').create();

const options = {
	src: 'src',
	dist: 'dist'
}

gulp.task('clean', () => {
	del('dist');
});

gulp.task('scripts', () => {
	return gulp.src(options.src + '/js/**')
		.pipe(maps.init())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/scripts'))
		.pipe(reload());
});

gulp.task('compileSass', () => {
	return gulp.src(options.src + '/sass/global.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.src + '/css'));
});

gulp.task('styles', ['compileSass'], () => {
	return gulp.src(options.src + '/css/global.css')
		.pipe(maps.init({loadMaps: true}))
		.pipe(csso())
		.pipe(rename('all.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/styles'));
});

gulp.task('images', () => {
	return gulp.src(options.src + '/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(options.dist + '/images'));
});

gulp.task('icons', () => {
	return gulp.src(options.src + '/icons/**')
		.pipe(gulp.dest(options.dist + '/icons'));
});

gulp.task('index', () => {
	const target = gulp.src(options.src + '/index.html');
	const sources = gulp.src([options.dist + '/scripts/*', 
		options.dist + '/styles/*']);
	return target.pipe(inject(sources, {ignorePath: options.dist, addRootSlash: false}))
		.pipe(gulp.dest(options.dist));
});

gulp.task('build', (done) => {
	runSeq('clean', ['scripts', 'styles', 'images'], 'index', 'icons', () => {
		return done();
	});
});

gulp.task('serve', ['build'], () => {
	browSync.init({
		server: 'dist'
	});
});

gulp.task('watch', () => {
	reload.listen();
	gulp.watch(options.src + '/js/**/*.js', ['scripts']);
});

gulp.task('default', ['build']);








