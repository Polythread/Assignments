// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
  const results = new Array(items.length);
  let nextIndex = 0;
  let completed = 0;
  let failed = false;

  if (items.length === 0) {
    return onComplete(null, results);
  }

  if (limit <= 0) {
    return onComplete(new Error("Limit must be greater than 0"));
  }

  function runNext() {
    if (failed || nextIndex >= items.length) return;

    const index = nextIndex++;

    worker(items[index], (err, result) => {
      if (failed) return;

      if (err) {
        failed = true;
        return onComplete(err);
      }

      results[index] = result;
      completed++;

      if (completed === items.length) {
        return onComplete(null, results);
      }

      runNext();
    });
  }

  const workers = Math.min(limit, items.length);

  for (let i = 0; i < workers; i++) {
    runNext();
  }
}

module.exports = batchProcess;
