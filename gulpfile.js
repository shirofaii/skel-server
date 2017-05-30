const gulp = require('gulp');
const webpack = require('webpack-stream');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

gulp.task('server:js', function() {
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

gulp.task('server', ['server:js'])

gulp.task('default', ['server'])
