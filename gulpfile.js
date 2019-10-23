const gulp = require('gulp'),
    sass = require('gulp-sass'), // plugin de gulp para compilar de sass (scss) a css
    pug = require('gulp-pug'), // plugin de gulp para compilar de pug a html
    autoprefixer = require('gulp-autoprefixer'), // plugin de gulp para añadir el codigo necesario para que el css genrado funcione en todos los navegadores 
    uglify = require('gulp-uglify'), // plugin de gulp para minificar javascript
    concat = require('gulp-concat'), // plugin de gulp para unir archivos en uno solo
    imagemin = require('gulp-imagemin'); // plugin de gulp para optimizar imagenes

// tarea para juntar todos los js y minificarlos en un solo arhivo que es: build/js/main.min.js
gulp.task('js', () => {
    return gulp.src(['js/jquery.js', 'src/js/*.js']) // primero en el metodo src especifico el o los archivos las cuales voy a trabaja, en este caso yo puse 2 archivos, si solo pusiera uno tendria que ir así: gulp.src('ruta_del_archivo')
            .pipe(concat('main.min.js')) // uno todos los archivos en uno solo llamado main.min.js
            .pipe(uglify()) // mimifico el archivo main.min.js
            .pipe(gulp.dest('build/js/')); // guardo los cambios (osea el archivo main.min.js) en el directorio especificado
});

// tarea para juntar todos los scss y minificarlos en un solo arhivo que es: build/css/main.min.css
gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
            .pipe(sass({
                outputStyle: 'compressed',
                errLogToConsole: true
            })) // compilo sass a css
            .pipe(concat('main.min.css')) // concateno (osea uno todos los archivos en uno solo llamado main.min.css)
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })) // le digo que añada soporte para todos los navegadores en sus dos ultimas versiones
            .pipe(gulp.dest('build/css/')); // guardo el archivo main.min.css en el directorio especificado
});

// tarea para compilar u¿y nuestro archivo index.pug convertirlo en index.html
gulp.task('pug', () => {
    return gulp.src('*.pug') // especifico donde estan los archivos con los cuales voy a trabajar
            .pipe(pug()) // compilo de pug a html
            .pipe(gulp.dest('build/')); // guardo el archivo generado en el directorio especificado
});

// tarea para comprimir y reducir el peso de nuestras imagenes
gulp.task('image', () => {
    return gulp.src('images/**/*.*') // especifico donde estan los archivos con los cuales voy a trabajar
            .pipe(imagemin()) // optimizo las imagenes
            .pipe(gulp.dest('build/images')); // guardo las imagenes optimiadas en el directorio especificado
 });

 /** 
  * tarea para que este constantemente vigilando las tareas definidas dentro y cada cambio que se haga se ejecutara la 
  * tarea correspondiente.
 */
gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', gulp.series('sass')); // cualquier cambio hecho en: scss/**/*.scss ejecutara automaticamente la tarea sass
    gulp.watch('*.pug', gulp.series('pug')); // cualquier cambio hecho en: *.pug ejecutara automaticamente la tarea pug
    gulp.watch('js/**/*.js', gulp.series('js')); // cualquier cambio hecho en: js/**/*.js ejecutara automaticamente la tarea js
});

gulp.task('default', gulp.series('watch')); // añadimos la tarea por defecto, para ejecutar el watch, vamos a la consolo y ejecutamos: #gulp 


// visitar este curso muy bueno: https://silicodevalley.com/curso/introduccion-a-gulp/