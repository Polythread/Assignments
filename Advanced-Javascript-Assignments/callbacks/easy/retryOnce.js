// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

function retryOnce(fn) {
  return function (...args) {
    const callback = args[args.length - 1];
    const fnArgs = args.slice(0, -1);

    fn(...fnArgs, (err, result) => {
      if (err) {
        fn(...fnArgs, (retryErr, retryResult) => {
          if (retryErr) {
            callback(retryErr, null);
          } else {
            callback(null, retryResult);
          }
        });
      } else {
        callback(null, result);
      }
    });
  };
}

module.exports = retryOnce;
