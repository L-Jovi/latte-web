const {readFileSync} = require('node:fs');
const {runInThisContext} = require('node:vm');
const tests = require('promises-aplus-tests');
const PromiseA = runInThisContext('(function () {' + readFileSync('mechanisms/promise/promise-a+.js', 'utf8') + ';return PromiseA})()');
tests({deferred() {
  const deferred = {};
  deferred.promise = new PromiseA((resolve, reject) => Object.assign(deferred, {resolve, reject}));
  return deferred;
}}, {reporter: 'dot'}, error => { if (error) process.exitCode = 1; });
