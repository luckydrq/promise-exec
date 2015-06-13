'use strict';

var cp = require('child_process');
var fs = require('mz/fs');
var EOL = require('os').EOL;
var thenify = require('thenify');
var Promise = require('native-or-bluebird');
var exec = cp.exec.bind(cp);
var slice = Array.prototype.slice;

var pexec = module.exports = thenify(exec);

var wrap = module.exports.wrap = function() {
  var args = slice.call(arguments);

  return function() {
    return pexec.apply(null, args);
  };
};

module.exports.execFile = function(file) {
  return fs.readFile(file, { encoding: 'utf8' })
    .then(function(content) {
      return content.split(EOL)
        .map(function(line) {
          // remove white space
          return line.trim();
        })
        .filter(function(line) {
          // comments
          return line && !/^#/.test(line);
        });
    })
    .then(function(commands) {
      commands = commands || [];
      var promise = Promise.resolve();
      for (var i = 0, len = commands.length; i < len; i++) {
        promise = promise.then(wrap(commands[i]));
      }
      return promise;
    });
}
