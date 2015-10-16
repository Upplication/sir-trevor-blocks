var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    addsrc = require('gulp-add-src'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    jsdoc = require('gulp-jsdoc'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag = require('gulp-tag-version'),
    fileinclude = require('gulp-file-include'),
    htmlclean = require('gulp-htmlclean'),
    runSequence = require('run-sequence'),
    p = require('path');

// Overwrite original gulpsrc for properly handling error events
// https://www.timroes.de/2015/01/06/proper-error-handling-in-gulp-js/
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function(error) {
      // Output an error message
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};

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

gulp.task('tag-patch', function() { return inc('patch'); });
gulp.task('tag-minor', function() { return inc('minor'); });
gulp.task('tag-major', function() { return inc('major'); });

gulp.task('css', function() {
  return gulp.src('./src/css/**/*.css')
              .pipe(concat('sir-trevor-blocks.css'))
              .pipe(gulp.dest("."))
              .pipe(rename('sir-trevor-blocks.min.css'))
              .pipe(minifyCSS({keepBreaks: false}))
              .pipe(gulp.dest("."));
});

gulp.task('js', function () {
  return gulp.src(['./src/js/locales/*.js', './src/js/**/*.js'])
              .pipe(fileinclude({
                basepath: p.join(__dirname, '.templates/')
              }))
              .pipe(concat("sir-trevor-blocks.js"))
              .pipe(gulp.dest("."))
              .pipe(rename('sir-trevor-blocks.min.js'))
              .pipe(uglify())
              .pipe(gulp.dest("."));
});

gulp.task('templates', function() {
  return gulp.src('./src/templates/**/*.html')
              .pipe(fileinclude({
                basepath: __dirname + '/src/templates'
              }))
              .pipe(htmlclean({
                protect: /<% .*? %>/g
              }))
              .pipe(gulp.dest(p.join(__dirname, '.templates/')))
})

gulp.task('doc', function() {
    gulp.src("./src/*.js")
      .pipe(jsdoc('./doc'))
})
gulp.task('docs', ['doc'])

gulp.task('compile', function (cb) {
  return runSequence('templates', ['js', 'css'], cb);
})

gulp.task('patch', ['compile', 'tag-patch'])
gulp.task('feature', ['compile', 'tag-minor'])
gulp.task('release', ['compile', 'tag-major'])
gulp.task('default', ['compile'])