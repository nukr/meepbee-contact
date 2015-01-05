var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack-config');

var path = {
    src: './client/src',
    build: './client/build'
}

gulp.task('build', function () {
    gulp.src(path.src + '/**')
        .pipe(gulp.dest(path.build))
});

gulp.task('webpack', function () {
    webpack(webpackConfig, function (err, stats) {
    });
});


gulp.task('default', ['build', 'webpack'], function () {
});
