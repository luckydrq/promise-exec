![](https://api.travis-ci.org/luckydrq/promise-exec.svg)

# promise-exec
A simple wrap for child_process.exec which returns promise

## Installation

```bash
$ npm install promise-exec
```

## API

### exec

It's a promise version of `child_process.exec`.

```javascript
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

```javascript
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

```javascript
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
