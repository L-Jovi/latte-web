import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source = path => readFileSync(path, 'utf8');
const evaluate = (path, expression, extra = {}) => runInNewContext(source(path) + '\n;' + expression, {console: {log(){}}, queueMicrotask, setTimeout, clearTimeout, performance, ...extra});
test('new: null and primitive returns preserve instance; objects/functions replace it', () => {
  assert.equal(evaluate('fundamentals/javascript/instance/new.js', `(()=>{function C(){this.x=1;return null} return forgeNew(C).x})()`), 1);
  assert.equal(evaluate('fundamentals/javascript/instance/new.js', `forgeNew(function(){return {x:2}}).x`), 2);
  assert.equal(evaluate('fundamentals/javascript/instance/new.js', `typeof forgeNew(function(){return ()=>1})`), 'function');
});
test('instanceof handles primitives and traverses inheritance', () => {
  assert.equal(evaluate('fundamentals/javascript/instance/instanceof.js', `forgeInstanceof(null,Object)`), false);
  assert.equal(evaluate('fundamentals/javascript/instance/instanceof.js', `forgeInstanceof([],Object)`), true);
});
test('call/apply do not overwrite receiver properties and clean up after exceptions', () => {
  for (const name of ['call','apply']) {
    const method='forge'+name[0].toUpperCase()+name.slice(1);
    assert.equal(evaluate(`fundamentals/javascript/context/${name}.js`, `(()=>{const obj={fn:7}; try { (function(){throw Error('x')}).${method}(obj) } catch {} return Reflect.ownKeys(obj).length===1 && obj.fn===7})()`), true);
  }
});
test('bind supports arguments and ordinary construction without modifying the target prototype', () => {
  assert.equal(evaluate('fundamentals/javascript/context/bind.js', `(()=>{function C(a,b){this.total=a+b};const B=C.forgeBind({total:0},2);const item=new B(3);return item.total===5 && item instanceof C && C.prototype.constructor===C})()`), true);
});
test('clone preserves cycles, aliases, sparse arrays, symbols and nested collections', () => {
  assert.equal(evaluate('mechanisms/utilities/clone/clone-deep.js', `(()=>{const key=Symbol('k'), child={x:2}, a={child,alias:child};a.self=a;a[key]=child;a.map=new Map([[child,new Set([child])]]);a.sparse=new Array(3);const b=cloneDeep(a);return b!==a && b.self===b && b.child===b.alias && b[key]===b.child && b.map.get(b.child).has(b.child) && b.sparse.length===3 && !(0 in b.sparse) && cloneDeep(null)===null})()`), true);
});
test('cycle detection distinguishes shared siblings, null and a real cycle', () => {
  assert.equal(evaluate('mechanisms/utilities/circle-ref/check-by-iterator.js', `(()=>{const child={}, a={one:child,two:child}; const acyclic=!isCycleByIterator(a);child.back=a;return acyclic && isCycleByIterator(a) && !isCycleByIterator(null)})()`), true);
});
test('type and formatting preserve actual intent', () => {
  assert.equal(evaluate('mechanisms/utilities/check-type.js', `isType('String')('test')`), true);
  assert.equal(evaluate('mechanisms/utilities/format/format-number.js', `formatNumber('-1234567.890')`), '-1,234,567.890');
});
test('publish/subscribe supports unsubscribe during delivery and hostile event names', () => {
  assert.equal(evaluate('mechanisms/design-patterns/pub-sub/simple.js', `(()=>{const hub=new EventHub(),got=[];let off;off=hub.on('__proto__',x=>{got.push(x);off()});hub.on('__proto__',x=>got.push(x+1));hub.emit('__proto__',1);hub.emit('__proto__',3);return got.join(',')})()`), '1,2,4');
});
test('debounce keeps receiver and latest arguments and supports cancellation', async () => {
  const fn=evaluate('mechanisms/utilities/debounce/simple.js','forgeDebounce');
  const calls=[];const object={x:3,run:fn(function(v){calls.push(this.x+v)},5)};
  object.run(1);object.run(2);await new Promise(r=>setTimeout(r,20));assert.deepEqual(calls,[5]);
  object.run(9);object.run.cancel();await new Promise(r=>setTimeout(r,20));assert.deepEqual(calls,[5]);
});
test('leading throttle invokes the first call and respects the boundary', () => {
  let now=0; const throttle=evaluate('mechanisms/utilities/throttle/simple.js','forgeThrottle',{performance:{now:()=>now}});
  let calls=0;const run=throttle(()=>++calls,10);run();now=9;run();now=10;run();assert.equal(calls,2);
});
test('drift timer can stop from inside its callback', async () => {
  const timer=evaluate('mechanisms/utilities/timer/timer-delay-fix.js','startDriftTimer');
  let calls=0;const stop=timer(()=>{calls++;stop()},5);await new Promise(r=>setTimeout(r,30));assert.equal(calls,1);
});
test('ForgePromise preserves falsey values, recovery, all order and finally rejection', async () => {
  const P=evaluate('mechanisms/promise/index.js','ForgePromise');
  assert.equal(await P.resolve(0),0);assert.equal(await P.resolve(false),false);
  assert.deepEqual(Array.from(await P.all([])),[]);
  assert.deepEqual(Array.from(await P.all([new P(r=>setTimeout(()=>r(1),5)),2])),[1,2]);
  assert.equal(await P.reject('x').catch(()=>3),3);
  await assert.rejects(P.reject(new Error('original')).finally(()=>P.resolve()),/original/);
  await assert.rejects(P.resolve(1).then(()=>{throw new Error('handler')}),/handler/);
});
test('generator counter keeps an undefined yielded value distinct from completion', () => {
  assert.equal(evaluate('mechanisms/generator/forge.js', `(()=>{const it=forgeGenerator(c=>{switch(c.next++){case 0:return undefined;case 1:c.stop();return c.sent}});return !it.next().done && it.next(7).value===7 && it.next().done})()`), true);
});
test('array reader has independent cursors and validates chunk sizes',()=>{
  assert.equal(evaluate('mechanisms/utilities/read-array.js',`(()=>{const a=[1,2,3],r=createArrayReader(a),s=createArrayReader(a);return JSON.stringify([r(2),s(),r(2),r()])})()`),'[[1,2],[1],[3],[]]');
  assert.throws(()=>evaluate('mechanisms/utilities/read-array.js','createArrayReader([])(0)'),/positive integer/);
});
