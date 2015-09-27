# promise-exec
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A simple wrap for child_process.exec which returns promise

## Installation

```bash
$ npm install promise-exec
```

## API

### exec

It's a promise version of `child_process.exec`.

```js
var exec = require('promise-exec');

exec('ls -al')
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.error(err);
  });
```

### exports.wrap

It's a sugar for subsequent thenable calls that makes code simpler and more elegant.

```js
var exec = require('promise-exec').wrap;

Promise.resolve()
  .then(exec('git add .'))
  .then(exec('git commit -m "fix xxx"'))
  .then(exec('git push origin master'))
  .catch(function(err) {
    console.error(err);
  });
```

### exports.execFile

Promise version of executing a shell script file, just like `sh test.sh`.

test.sh:

```bash
touch index.txt
echo "hello" > index.txt
# comments will be ingored
cat index.txt
```

index.js:

```js
var fs = require('fs');
var path = require('path');
var execFile = require('promise-exec').execFile;
var file = path.join(__dirname, './test.sh');

execFile(file)
  .then(function() {
    var txt = path.join(__dirname, 'index.txt');
    console.log(fs.existsSync(txt));  // true

    var content = fs.readFileSync(txt, { encoding: 'utf8' });
    console.log(content);  // hello\n
  })
  .catch(function(err) {
    console.error(err);
  });
```

## Lisence
MIT

[npm-image]: https://img.shields.io/npm/v/promise-exec.svg?style=flat-square
[npm-url]: https://npmjs.org/package/promise-exec
[travis-image]: https://img.shields.io/travis/luckydrq/promise-exec/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/luckydrq/promise-exec
[coveralls-image]: https://img.shields.io/coveralls/luckydrq/promise-exec/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/luckydrq/promise-exec?branch=master
