// Problem Description – Priority Task Queue with Dynamic Concurrency
//
// You are required to implement a task queue that executes asynchronous
// tasks based on priority.
// Higher-priority tasks should be executed before lower-priority ones.
// The queue must enforce a concurrency limit, ensuring only a fixed number
// of tasks run at the same time.
// The concurrency limit can be updated dynamically while the system is running.
//
// Each task must invoke its callback when finished.

class DynamicPriorityQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  setLimit(newLimit) {
    if (newLimit <= 0) return;

    this.concurrency = newLimit;
    this.runNext();
  }

  add(task, priority, onComplete) {
    this.queue.push({ task, priority, onComplete });

    this.queue.sort((a, b) => b.priority - a.priority);

    this.runNext();
  }

  runNext() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { task, onComplete } = this.queue.shift();

      this.running++;

      task((err, result) => {
        onComplete(err, result);

        this.running--;
        this.runNext();
      });
    }
  }
}

module.exports = DynamicPriorityQueue;
