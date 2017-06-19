/**
 * Created by Lee on 25.11.2016.
 */
var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload'),
    gcmq         = require('gulp-group-css-media-queries'),
    sourcemaps   = require('gulp-sourcemaps');


gulp.task('connect', function() {
    connect.server({
        root:'',
        livereload:true
    });
});

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('css/style.wm-test') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/')) // Выгружаем результата в папку app/css
        .pipe(connect.reload());
});

gulp.task('sass-watch', function() {
    return gulp.src('css/style.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('css/')); // Выгружаем в папку app/css
});

gulp.task('html', function () {
    gulp.src('html/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('css/style.css', ['sass']);
    gulp.watch('html/**/*.html', ['html']);
});



gulp.task('default', ['watch', 'sass-watch', 'connect', 'sass', 'html']);


