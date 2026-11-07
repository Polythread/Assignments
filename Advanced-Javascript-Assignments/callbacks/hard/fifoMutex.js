// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  lock(task, onComplete) {
    if (this.locked) {
      this.queue.push({ task, onComplete });
      return;
    }

    this.locked = true;

    task((err, result) => {
      onComplete(err, result);
      this._release();
    });
  }

  _release() {
    if (this.queue.length === 0) {
      this.locked = false;
      return;
    }

    const { task, onComplete } = this.queue.shift();

    task((err, result) => {
      onComplete(err, result);
      this._release();
    });
  }
}

module.exports = Mutex;
