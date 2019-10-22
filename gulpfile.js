const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', () => {
    return gulp.src(['src/js/bootstrap.js', 'src/js/*.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/js/'));
});

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
            .pipe(sass({
                outputStyle: 'compressed',
                errLogToConsole: true
            }))
            .pipe(concat('main.min.css'))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('build/css/'));
});

gulp.task('pug', () => {
    return gulp.src('*.pug')
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest('build/'));
});

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('*.pug', gulp.series('pug'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('watch'));
