var gulp = require('gulp'),
    less = require('gulp-less'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch');


gulp.task('less', function () {
    gulp.src('./source/less/main.less')
        .pipe(less())
        .on('error', function(e) {
            console.log('Ошибка в задаче LESS!');
        })
        .pipe(gulp.dest('./source/css'))
        .pipe(notify('Задача LESS завершена успешно!'));
});


gulp.task('css', function () {
    gulp.src(['./bower_components/normalize-css/normalize.css',
              './bower_components/bxslider-4/jquery.bxslider.css',
              './source/css/*.css'
        ])
        .pipe(concatCss('all.css'))
        .on('error', function(e) {
            console.log('Ошибка в задаче CSS!');
        })
        .pipe(prefix('last 3 versions', '> 1%', 'ie 8'))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(notify('Задача CSS завершена успешно!'));
});


gulp.task('js', function () {
    gulp.src([//'./bower_components/jquery/dist/jquery.min.js',
              './bower_components/bxslider-4/jquery.bxslider.min.js',
              './source/js/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .on('error', function(e) {
            console.log('Ошибка в задаче JS!');
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
        .pipe(notify('Задача JS завершена успешно!'));
});


gulp.task('watch-less', function () {
    gulp.watch('./source/less/*.less', ['less', 'css']);
});

gulp.task('watch-css', function () {
    gulp.watch('./source/css/*.css', ['css']);
});

gulp.task('watch-js', function () {
    gulp.watch('./source/js/*.js', ['js']);
});


gulp.task('default', ['watch-less', 'watch-css', 'watch-js']);