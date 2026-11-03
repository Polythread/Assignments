// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.

function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
  let completed = false;
  let failedCount = 0;
  let timer;

  function handleSuccess(result) {
    if (completed) return;

    completed = true;
    clearTimeout(timer);
    onComplete(null, result);
  }

  function handleFailure(error) {
    failedCount++;

    if (failedCount === 2 && !completed) {
      completed = true;
      clearTimeout(timer);
      onComplete(error);
    }
  }

  primary((err, result) => {
    if (err) {
      handleFailure(err);
    } else {
      handleSuccess(result);
    }
  });

  timer = setTimeout(() => {
    if (completed) return;

    secondary((err, result) => {
      if (err) {
        handleFailure(err);
      } else {
        handleSuccess(result);
      }
    });
  }, timeoutMs);
}

module.exports = hedgedRequest;
