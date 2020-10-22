// 在这里书写practice这个项目的打包配置
/* 
    gulp里面提供的方法
        src()
            用来找到你要打包的文件夹
            src('你要打包的文件的地址')
            返回值是一个二进制流，就可以继续去调用别的方法
        pipe()
            用来帮你做事情的
            pipe(你要做的事情)
            返回值:又是一个二进制流，就可以继续去调用别的方法
        dest()
            用来写入文件的
            你要把已经压缩好的代码放在哪一个文件夹黎明
            如果没有你指定的文件夹会自动创建一个这个文件夹放进去

        parallel()
            用来并行执行多个任务的
            gulp.parallel(你定义好的任务1，你定义好的任务2,....)
            他会把这几个任务都给你执行了
            返回值:是一个任务流
            只要这个返回值一致性，就能把你准备好的几个任务同时开始执行
        
        series()
            用来逐个执行多个任务的
            gulp.series(任务1，任务2，...)
            返回值:是一个任务流
            只要这个返回值一执行，就能把你准备好的几个任务逐一完成
            前一个任务完成后再执行后面一个任务

        watch()
            用来监控文件变化的
            gulp.watch(你要监控的文件目录，你要执行的任务)
*/

const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const sass = require('gulp-sass')


const cssHandler = () => {
    return gulp.src('./src/css/*.css')
        // .pipe(gulp.dest('./dist/css'))
        .pipe(autoprefixer())
        // .pipe(gulp.dest('./dist/css'))
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
}

const imgHandler = () => {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'))
}
const jsonHandler = () => {
    return gulp.src('./src/json/**')
        .pipe(gulp.dest('./dist/json'))
}

const jsHandler = () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

const libHandler = () => {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib'))
}
const fontHandler = () => {
    return gulp.src('./src/font/**')
        .pipe(gulp.dest('./dist/font'))
}
const interfaceHandler = () => {
    return gulp.src('./src/interface/**')
        .pipe(gulp.dest('./dist/interface'))
}

const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapaseBooleanAttributes: true,
            removeComments: true,
            minifyCss: true,
            mififyJS: true
        }))
        .pipe(gulp.dest('./dist/pages'))
}

const delHandler = () => {
    return del(['./dist'])
}


const phpHandler = () => {
    return gulp.src('./src/php/*.php')
        .pipe(gulp.dest("./dist/php"))
}

const watchHandler = () => {
    gulp.watch('./src/css/*.css', cssHandler);
    gulp.watch('./src/img/**', imgHandler);
    gulp.watch('./src/lib/**', libHandler);
    gulp.watch('./src/font/**', fontHandler);
    gulp.watch('./src/json/**', jsonHandler);
    gulp.watch('./src/interface/**', interfaceHandler);
    gulp.watch('./src/pages/*.html', htmlHandler);
    gulp.watch('./src/js/*.js', jsHandler);
    gulp.watch('./src/sass/*.scss', sassHandler);
    gulp.watch('./src/php/*.php', phpHandler);
}



const sassHandler = () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
}



module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        jsHandler,
        libHandler,
        fontHandler,
        interfaceHandler,
        htmlHandler,
        sassHandler,
        jsonHandler,
        phpHandler
    ),
    watchHandler
)