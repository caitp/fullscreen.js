var server = require('karma').server,
    path = require('path'),
    spawn = require('child_process').spawn;

module.exports = exports = function karma(options, done) {
  if (typeof options === 'function') done = options, options = undefined;
  if (typeof done !== 'function') throw "karma plugin requires callback function";
  if (typeof options === 'string') options = { configFile: options };
  else options = options || {};
  if (typeof options.configFile === 'undefined') options.configFile = 'karma.conf.js';
  options.configFile = path.resolve(process.cwd(), options.configFile);
  if (typeof options.singleRun === 'undefined' && typeof options.autoWatch === 'undefined')
    options.singleRun = true;
  if (typeof options.browsers === 'string') options.browsers = [options.browsers];
  var extra = [];
  if (!!options.debugRun) {
    extra.push('--debug');
    delete options.debugRun;
  }
  var args = [path.join(__dirname, 'background.js'), JSON.stringify(options)].concat(extra);
  var proc = spawn(process.execPath,
    args, {
      stdio: 'pipe',
      env: process.env
    });

  proc.stdio[1].on('data', function(data) {
    process.stdout.write(data.toString());
  });
  proc.stdio[2].on('data', function(data) {
    process.stdout.write(data.toString());
  });
  proc.on('close', function(status) {
    if (status === 0) done();
    else done(new Error());
  });
};
