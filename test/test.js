'use strict';

var path = require('path');
var assert = require('assert');
var exec = require('..');
var wrap = require('..').wrap;
var execFile = require('..').execFile;
var Promise = require('native-or-bluebird');

describe('exec promise', function() {
  it('should return promise and resolve', function(done) {
    exec('ls -al')
      .then(function(result) {
        assert(result.length);
        done();
      })
      .catch(done);
  });

  it('should return promise and reject', function(done) {
    exec('whatever command not exist')
      .then(function(result) {
        done(null, result);
      })
      .catch(function(err) {
        assert(err instanceof Error);
        done();
      });
  });

  it('should wrap an promise', function(done) {
    Promise.resolve()
      .then(wrap('ls -al'))
      .then(function(result) {
        assert(result.length);
        done();
      })
      .catch(done);
  });

  it('should exec a bash file successfully', function(done) {
    execFile(path.join(__dirname, 'test.sh'))
      .then(function(result) {
        assert(result.length);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
