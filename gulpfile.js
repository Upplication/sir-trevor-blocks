var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jsdoc = require('gulp-jsdoc'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag = require('gulp-tag-version');

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
        .pipe(git.commit('bump package version'))  // commit the changed version number
        .pipe(filter('package.json'))              // read only one file to get the version number
        .pipe(tag({ prefix: '' }))                 // **tag it in the repository**
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('feature', function() { return inc('minor'); })
gulp.task('release', function() { return inc('major'); })

gulp.task('compile', function () {
    gulp.src('./src/*.js')
        .pipe(concat("sir-trevor-blocks.js"))
        .pipe(gulp.dest("."))
        .pipe(rename('sir-trevor-blocks.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("."))
});

gulp.task('default', ['compile'])