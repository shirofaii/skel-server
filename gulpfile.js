const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');

gulp.task('server:ts', () => {
    const tsProject = ts.createProject('tsconfig.json')
    const result = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/'))
})

gulp.task('nodemon', shell.task(["nodemon server.js"], {cwd: "./build"}))
gulp.task('default', ['server:ts'])
