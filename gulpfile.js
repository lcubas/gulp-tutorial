const gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');

// tarea para juntar todos los js y minificarlos en un solo arhivo que es: build/js/main.min.js
gulp.task('js', () => {
    return gulp.src(['js/jquery.js', 'src/js/*.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('build/js/'));
});

// tarea para juntar todos los scss y minificarlos en un solo arhivo que es: build/css/main.min.css
gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
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

// tarea para compilar u¿y nuestro archivo index.pug convertirlo en index.html
gulp.task('pug', () => {
    return gulp.src('*.pug')
            .pipe(pug())
            .pipe(gulp.dest('build/'));
});

// tarea para comprimir y reducir el peso de nuestras imagenes
gulp.task('image', () => {
    return gulp.src('images/**/*.+(png|jpg|gif)')
            .pipe(imagemin())
            .pipe(gulp.dest('build/images'));
 });

 // tarea para que este constantemente vigilando las tareas definidas dentro
gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('*.pug', gulp.series('pug'));
    gulp.watch('js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('watch'));
