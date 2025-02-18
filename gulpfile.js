// 1:30:59 / 2:48:52

// Gulp

const gulp = require('gulp');

// Plugins

const fs = require('fs');
const clean = require('gulp-clean');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const sourceMaps = require('gulp-sourcemaps');
// const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

// Settings

const cleanSettings = {
    force: true
}

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
};

const sassSettings = {
    indentType: 'tab',
    indentWidth: 1,
    outputStyle: 'expanded'
}

const serverSettings = {
    livereload: true,
    open: true
}

const plumberSettings = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    }
}

// Tasks

gulp.task('clean', function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false })
            .pipe(clean(cleanSettings));
    };
    done();
});

gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
        .pipe(plumber(plumberSettings('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber(plumberSettings('SCSS')))
        .pipe(sourceMaps.init())
        .pipe(sass(sassSettings))
        // .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('images', function () {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(plumber(plumberSettings('JS')))
        .pipe(babel())
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('libs', function () {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dist/libs/'));
});

gulp.task('files', function () {
    return gulp.src('./src/files/**/*')
        .pipe(gulp.dest('./dist/files/'));
});

gulp.task('server', function () {
    return gulp.src('./dist/')
        .pipe(server(serverSettings));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/html/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/files/**/*', gulp.parallel('files'));
    gulp.watch('./src/js/*.js', gulp.parallel('js'));
});

// Default task

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'sass', 'images', 'fonts', 'js', 'libs', 'files'),
    gulp.parallel('server', 'watch')
));
