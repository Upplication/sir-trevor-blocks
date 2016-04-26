var gulp = require('gulp'),
    webpack = require('webpack')
    gutil = require('gulp-util'),
    addsrc = require('gulp-add-src'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag = require('gulp-tag-version'),
    seq = require('run-sequence');

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */
var inc = function(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json'])
        .pipe(bump({type: importance}))            // bump the version number in those files
        .pipe(gulp.dest('./'))                     // save it back to filesystem
        .pipe(addsrc(['./sir-trevor-blocks.*', './sir-trevor-blocks.min.*']))
        .pipe(git.commit('bump package version'))  // commit the changed version number
        .pipe(filter('package.json'))              // read only one file to get the version number
        .pipe(tag({ prefix: '' }))                 // **tag it in the repository**
}

var compile = function(production) {
    production = production === true;

    return function(callback) {

        var config = require('./webpack.config.js');

        if (production) {

            // Rename the output keys to min versions
            var entries = config.entry;
            var newEntries = {};
            Object.keys(entries).forEach(function(entry) {
                var minEntry = entry.replace(/\.([a-z]+)$/i, '.min.$1');
                newEntries[minEntry] = entries[entry];
            })
            config.entry = newEntries;

            // Add the uglify plugin
            if (!config.plugins)
                config.plugins = [];
            config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minify: true }));
        }

        webpack(require('./webpack.config.js'), function(err, stats) {
            if(err)
                throw new gutil.PluginError('webpack', err);

            gutil.log('[webpack]', stats.toString({ colors: true }));
            callback();
        });
    }
}

gulp.task('tag-patch', function() { return inc('patch'); });
gulp.task('tag-minor', function() { return inc('minor'); });
gulp.task('tag-major', function() { return inc('major'); });

gulp.task('patch', function (cb) {
  return seq('compile', 'tag-patch', cb)
});

gulp.task('feature', function (cb) {
  return seq('compile', 'tag-minor', cb)
});

gulp.task('release', function (cb) {
  return seq('compile', 'tag-major', cb)
});

gulp.task('compile-uncompressed', compile());
gulp.task('compile-minify', compile(true));
gulp.task('compile', function(cb) {
    return seq('compile-uncompressed', 'compile-minify', cb);
})

gulp.task('default', ['compile'])
