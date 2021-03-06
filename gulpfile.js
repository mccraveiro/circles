var gulp        = require('gulp'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    less        = require('gulp-less'),
    minifyCSS   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify')
    order       = require('gulp-order')
    watch       = require('gulp-watch')
    ghPages     = require('gulp-gh-pages');

gulp.task ('default', ['styles', 'scripts']);

gulp.task ('styles', function () {
    return gulp
    .src('./src/less/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('css.css'))
    .pipe(gulp.dest('./build/assets/css/'));
});

gulp.task ('scripts', function () {
    browserify({
        entries: './src/js/main.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('script.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/assets/js/'));
});

gulp.task('deploy', ['default'], function() {
    return gulp
    .src('./build/**/*')
    .pipe(ghPages({
        message: 'Deploy on gh-pages',
        force: true
    }));
});

gulp.task ('watch', ['default'], function () {
    gulp.watch('./src/js/**/*', ['scripts']);
    gulp.watch('./src/less/**/*', ['styles']);
});