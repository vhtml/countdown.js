const formatNumber = (num, p = 2) => {
  num = +num;
  p = Math.max(String(num).length, p);
  return (new Array(p).join('0') + num).slice(-p);
};

const convertTime = (value) => {
  value = value / 1000 | 0;
  const h = value / (60 * 60) | 0;
  value -= h * 60 * 60;
  const m = value / 60 | 0;
  const s = value - m * 60;
  return {
    hour: formatNumber(h),
    min: formatNumber(m),
    sec: formatNumber(s)
  };
};

const noop = function() {};

export default class CountDown {
  constructor(options) {
    this.tid = null;
    this.onTimeChange = options.onTimeChange || noop;
    this.onTimeChangeEnd = options.onTimeChangeEnd || noop;
  }

  run(milliseconds = 0) {
    this.endTime = Date.now() + milliseconds;
    this.stop();
    const run = () => {
      this.tid = setTimeout(run, 1000);
      this.getRTime();
    };
    run();
  }

  getRTime() {
    const rTime = this.endTime - Date.now();
    if (rTime <= 0) {
      this.stop();
      this.onTimeChange({ hour: '00', min: '00', sec: '00' });
      this.onTimeChangeEnd();
    } else {
      this.onTimeChange(convertTime(rTime));
    }
  }

  stop() {
    clearTimeout(this.tid);
    this.tid = null;
  }

};
