(function () {
    'use strict';

    let del = require('del'),
        gulp = require('gulp'),
        ts = require('gulp-typescript'),
        tsProject = ts.createProject('./tsconfig.json');

    function clean() {
        return del(['./dist']);
    }

    function compile() {
        let tsResult = tsProject.src().pipe(tsProject());
        return tsResult.js.pipe(gulp.dest('./dist'));
    }

    gulp.task('clean', clean);
    gulp.task('compile', compile);
})();
