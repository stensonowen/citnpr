
const UPDATE_MS = 69;

class Stopwatch {
  constructor(app) {
    this.app = app;
    this.reset();
  }

  reset() {
    this.elapsed_ms = 0;
    if (this.timer) {
      clearInterval(this.timer);
      this.app.set_time("00:00");
    }
    this.timer = null; // setInterval
  }

  start() {
    this.reset();
    this.last_update = Date.now();
    const update = () => this.update();
    this.timer = setInterval(update, UPDATE_MS);
  }

  update() {
    const now = Date.now();
    const elapsed_new = now - this.last_update;
    this.last_update = now;
    this.elapsed_ms += elapsed_new;
    this.app.set_time(this.format_elapsed());
  }

  elapsed() {
    return this.elapsed_ms;
  }

  format_elapsed() {
    const total_ms = this.elapsed();
    const seconds_n = Math.floor(total_ms / 1000);
    const millis_n  = Math.floor(total_ms - seconds_n * 1000);
    const seconds_s = (seconds_n < 10 ? '0' : '') + seconds_n;
    const millis_s  = (millis_n + '000').substr(0, 3);
    return seconds_s + ":" + millis_s;
  }

}

export default { Stopwatch };
