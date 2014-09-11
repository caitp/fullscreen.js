var gulp = require('gulp');
var karma = require('./lib/gulp/karma');
var args = require('minimist')(process.argv.slice(2), {
    boolean: [
        'watch'
    ],
    default: {
        'watch': false
    }
});

gulp.task('test', function(done) {
    var options = {
        configFile: 'karma.conf.js'
    };
    for (var i=0, ii = process.argv.length; i<ii; ++i) {
        var val = process.argv[i];
        if (val === '--debug') options.debugRun = true;
        else if (val === '--single-run') options.singleRun = true;
        else if (val === '--browsers') options.browsers = process.argv[++i].split(',');
    }
    return karma('karma.conf.js', done);
});
