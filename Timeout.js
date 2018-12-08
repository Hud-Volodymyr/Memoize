'use strict';

const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');

const memo = (fn, msec = 1000) => {
  const cache = {};
  const timers = {};
  const cb = (key) => {
    console.log(`Timer for ${key} is done`);
    delete cache[key];
  };
  const func = (...args) => {
    const key = generateKey(args);
    const val = cache[key];
    if (val) {
      clearTimeout(timers[key]);
      timers[key] = setTimeout(() => { cb(key); }, msec);
      console.log('From cache');
      //console.log(cache)
      return val;
    }
    timers[key] = setTimeout(() => { cb(key); }, msec);
    const result = fn(...args);
    cache[key] = result;
    //console.log(cache);
    return result;
  };
  return func;

};

const sumSeq = (a, b) => {
  console.log('Calculate sum');
  let r = 0;
  for (let i = a; i < b; i++) r += i;
  return r;
};
const memoized = memo(sumSeq, 600);
console.log(memoized(2, 5));
setTimeout(() => {
  console.log(memoized(3, 8));
  setTimeout(() => {
    console.log(memoized(3, 8));
    setTimeout(() => {
      console.log(memoized(2, 16));
    }, 200);
  }, 500);
}, 500);
