// core/writeQueue.js
class WriteQueue {
  constructor({ concurrency = 1 } = {}) {
    this.concurrency = concurrency;
    this.active = 0;
    this.q = [];              // { path, taskFn, resolve, reject }
    this.locks = new Set();   // per-path mutex
  }

  enqueue(path, taskFn) {
    return new Promise((resolve, reject) => {
      this.q.push({ path, taskFn, resolve, reject });
      this._drain();
    });
  }

  /* ----------------- internal helpers ----------------- */
  #drain() {
    while (this.active < this.concurrency) {
      const idx = this.q.findIndex(j => !this.locks.has(j.path));
      if (idx < 0) return;

      const job = this.q.splice(idx, 1)[0];
      this.locks.add(job.path);
      this.active++;

      Promise.resolve()
        .then(job.taskFn)
        .then(job.resolve, job.reject)
        .finally(() => {
          this.locks.delete(job.path);
          this.active--;
          this._drain();
        });
    }
  }
}
