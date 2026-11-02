// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runWithDependencies(tasks, finalCallback) {
  const completed = new Set();
  const running = new Set();
  const results = {};
  let finished = 0;
  let failed = false;

  if (tasks.length === 0) {
    return finalCallback(null, results);
  }

  function runNext() {
    if (failed) return;

    if (finished === tasks.length) {
      return finalCallback(null, results);
    }

    for (const task of tasks) {
      if (completed.has(task.id) || running.has(task.id)) {
        continue;
      }

      const dependencies = task.dependencies || [];

      if (dependencies.every((dep) => completed.has(dep))) {
        running.add(task.id);

        task.run((err, result) => {
          running.delete(task.id);

          if (failed) return;

          if (err) {
            failed = true;
            return finalCallback(err);
          }

          results[task.id] = result;
          completed.add(task.id);
          finished++;

          runNext();
        });
      }
    }

    if (running.size === 0 && finished < tasks.length) {
      failed = true;
      finalCallback(new Error("Circular or unresolved dependencies"));
    }
  }

  runNext();
}

module.exports = runWithDependencies;
