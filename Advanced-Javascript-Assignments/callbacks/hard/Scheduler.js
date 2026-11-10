// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class Scheduler {
  constructor() {
    this.queue = [];
    this.running = false;
    this.taskId = 0;
  }

  schedule(task, priority = 0) {
    this.queue.push({
      task,
      priority,
      id: this.taskId++,
    });

    this.queue.sort((a, b) => {
      return b.priority - a.priority || a.id - b.id;
    });
  }

  run(onAllFinished) {
    if (this.running) return;

    this.running = true;

    const next = () => {
      if (this.queue.length === 0) {
        this.running = false;
        onAllFinished(null);
        return;
      }

      const current = this.queue.shift();
      let completed = false;

      const done = (err) => {
        if (completed) return;
        completed = true;

        if (err) {
          this.running = false;
          onAllFinished(err);
          return;
        }

        next();
      };

      const yieldControl = (callback) => {
        if (completed) return;

        setTimeout(() => {
          if (
            this.queue.length > 0 &&
            this.queue[0].priority > current.priority
          ) {
            this.queue.push(current);
            next();
          } else {
            callback();
          }
        }, 0);
      };

      current.task(done, yieldControl);
    };

    next();
  }
}

module.exports = Scheduler;
