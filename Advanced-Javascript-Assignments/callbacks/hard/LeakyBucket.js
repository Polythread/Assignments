// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.capacity = capacity;
    this.leakRateMs = leakRateMs;
    this.queue = [];
    this.processing = false;
  }

  add(task, onComplete) {
    if (this.queue.length >= this.capacity) {
      onComplete(new Error("Bucket is full"));
      return;
    }

    this.queue.push({ task, onComplete });

    if (!this.processing) {
      this.processing = true;
      this._process();
    }
  }

  _process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    const { task, onComplete } = this.queue.shift();

    setTimeout(() => {
      task((err, result) => {
        onComplete(err, result);
        this._process();
      });
    }, this.leakRateMs);
  }
}

module.exports = LeakyBucket;
