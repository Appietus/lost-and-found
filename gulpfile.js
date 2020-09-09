/**
 * t-kay.com
 *
 * @copyright TKAY
 */

const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const pump = require('pump');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const PUBLIC_FONT_DIR = 'assets/font';
const PRIVATE_JS_DIR = 'private/js';
const PUBLIC_JS_DIR = 'assets/js';
const PRIVATE_SASS_DIR = 'private/scss';
const PUBLIC_CSS_DIR = 'assets/css';

gulp.task('css', function(done) {
    pump([
        gulp.src(PRIVATE_SASS_DIR + '/ecc.scss'),
        sass({outputStyle: 'compressed'}),
        gulp.dest(PUBLIC_CSS_DIR)
    ]);
    done();
});

gulp.task('js', function(done) {
    pump([
        gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/lottie-web/build/player/lottie.js',
            'node_modules/lottie-web/build/player/lottie.min.js',
        ]),
        gulp.dest(PUBLIC_JS_DIR + '/vendor'),
    ]);
    pump([
        gulp.src([PRIVATE_JS_DIR + '/*.js', PRIVATE_JS_DIR + '/**/*.js']),
        gulp.dest(PUBLIC_JS_DIR),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest(PUBLIC_JS_DIR)
    ]);
    done();
});

gulp.task('font', function(done) {
    pump([
        gulp.src('node_modules/font-awesome/fonts/*'),
        gulp.dest(PUBLIC_FONT_DIR)
    ]);
    done();
});

gulp.task('watch', function() {
    gulp.watch(
        [
            PRIVATE_SASS_DIR + '/*.scss',
            PRIVATE_SASS_DIR + '/**/*.scss',
            PRIVATE_SASS_DIR + '/**/**/*.scss',
            PRIVATE_JS_DIR + '/*.js',
            PRIVATE_JS_DIR + '/**/*.js',
            PRIVATE_JS_DIR + '/**/**/*.js'
        ],
        ['assets']
    );
});

gulp.task('default', gulp.parallel('css', 'js', 'font'));
