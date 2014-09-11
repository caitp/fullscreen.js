var gulp = require('gulp');
var karma = require('./lib/gulp/karma');
var jshint = require('gulp-jshint');
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
    var options = {
        configFile: 'karma.conf.js',
        debugRun: args.debug
    };
    return karma('karma.conf.js', done);
});

gulp.task('test', function(done) {
    if (args.watch) {
        gulp.watch(['fullscreen.js', '*.spec.js'], ['tests']);
    }
    return gulp.run('tests');
});

gulp.task('default', ['jshint', 'test']);
