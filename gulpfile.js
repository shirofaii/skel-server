const gulp = require('gulp');
const webpack = require('webpack-stream');
const fs = require('fs');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');

gulp.task('server:webpack', () => {
    const nodeModules = {};
    fs.readdirSync('node_modules')
    .filter(x => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(mod => {
        nodeModules[mod] = 'commonjs ' + mod;
    })
    return gulp.src(['src/server.ts'])
        .pipe(webpack({
            output: {filename: 'server.js'},
            devtool: "source-map",
            resolve: {
                extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },
            target: 'node',
            module: {
                loaders: [
                    { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
                ],
                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]
            },
            externals: nodeModules
        }))
        .pipe(gulp.dest('build/'));
});

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
gulp.task('default', ['server:webpack'])
