// Problem Description – Parallel Execution with Concurrency Limit
//
// You need to execute many asynchronous tasks (e.g., image downloads),
// but only a fixed number are allowed to run at the same time to avoid
// resource exhaustion.
//
// This problem tests concurrency control and result ordering.
//
// Requirements:
// - Accept an array of tasks and a concurrency limit.
// - Run at most `limit` tasks in parallel until all are completed.
// - Return results in the original task order via onAllFinished.

function mapLimit(tasks, limit, onAllFinished) {
  const results = new Array(tasks.length);
  let nextIndex = 0;
  let completed = 0;

  if (tasks.length === 0) {
    onAllFinished(null, results);
    return;
  }

  if (limit <= 0) {
    onAllFinished(new Error("Invalid concurrency limit"));
    return;
  }

  function runNext() {
    if (completed === tasks.length) {
      onAllFinished(null, results);
      return;
    }

    if (nextIndex >= tasks.length) return;

    const currentIndex = nextIndex++;

    tasks[currentIndex]((err, result) => {
      if (err) {
        onAllFinished(err);
        return;
      }

      results[currentIndex] = result;
      completed++;

      runNext();
    });
  }

  const workers = Math.min(limit, tasks.length);

  for (let i = 0; i < workers; i++) {
    runNext();
  }
}

module.exports = mapLimit;
