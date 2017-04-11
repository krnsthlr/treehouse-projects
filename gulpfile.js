'use strict';

const gulp = require('gulp'),
	   del = require('del'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	  maps = require('gulp-sourcemaps'),
	useref = require('gulp-useref');

const options = {
	src: 'src',
	dist: 'dist'
}

gulp.task('clean', () => {
	del('dist');
});

gulp.task('scripts', ['clean'], () => {
	return gulp.src([options.src + '/js/circle/*.js',
		options.src + '/js/global.js'])
		.pipe(maps.init())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + '/scripts'));
});

gulp.task('html', ['scripts'], () => {
	return gulp.src(options.src + '/index.html')
		.pipe(useref())
		.pipe(gulp.dest(options.dist));
});