var gulp = require('gulp');
var karma = require('./lib/gulp/karma');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var args = require('minimist')(process.argv.slice(2), {
    boolean: [
        'debug',
        'watch',
    ],
    default: {
        'watch': false,
        'debug': false
    }
});

var options = {
  configFile: 'karma.conf.js',
  singleRun: !args.watch,
  autoWatch: args.watch,
  debugRun: false
};

for (var i=0, ii = process.argv.length; i<ii; ++i) {
    var val = process.argv[i];
    if (val === '--debug') options.debugRun = true;
    else if (val === '--browsers') options.browsers = process.argv[++i].split(',');
}

gulp.task('jshint', function() {
   return gulp.src(['./fullscreen.js']).
       pipe(jshint()).
       pipe(jshint.reporter('jshint-stylish')).
       pipe(jshint.reporter('fail'));
});

gulp.task('tests', function(done) {
    return karma(options, done);
});

gulp.task('test', function(done) {
    if (args.watch) {
        gulp.watch(['fullscreen.js', '*.spec.js'], ['tests']);
    }
    return gulp.run('tests');
});

gulp.task('min', function() {
   return gulp.src('./fullscreen.js').
       pipe(uglify({
           preserveComments: 'some'
       })).
       pipe(concat('fullscreen.min.js')).
       pipe(gulp.dest('.'));
});

gulp.task('default', ['jshint', 'test']);
