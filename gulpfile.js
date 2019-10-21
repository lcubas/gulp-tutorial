const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', () => {
    return gulp.src('asstes/js/**/*.js')
            .pipe(concat())
            .pipe(uglify());
});

gulp.task('sass', () => {
    return gulp.src('assets/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('build/css/'));
});

gulp.task('pug', () => {
    return gulp.src('*.pug')
            .pipe(pug())
            .pipe(gulp.dest('build/'))
});

gulp.task('watch', () => {
    gulp.watch('assets/scss/*.scss', gulp.series('sass'));
    gulp.watch('*.pug', gulp.series('pug'));
    gulp.watch('assets/js/**/*.js', gulp.series('js'));
});

gulp.task('default', ['watch']);
