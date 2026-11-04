// Problem Description – Debounced Search with Result Guard
//
// You are building a search bar that should not call the API
// on every keystroke, so the request must be debounced.
//
// If an older request finishes after a newer one, its result
// must be ignored to prevent stale UI updates.
//
// Requirements:
// - Delay execution by waitMs.
// - Reset the timer on repeated calls.
// - Only the latest request may trigger the callback.

function createSmartDebounce(worker, waitMs) {
  let timer;
  let requestId = 0;

  return function (...args) {
    clearTimeout(timer);

    const currentId = ++requestId;

    timer = setTimeout(() => {
      worker(...args, (...result) => {
        if (currentId === requestId) {
          args[args.length - 1](...result);
        }
      });
    }, waitMs);
  };
}

module.exports = createSmartDebounce;
