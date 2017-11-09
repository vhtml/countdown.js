### Usage

```javascript

const cd = new CountDown({
  onTimeChange: (digital) => {
    console.log(digital);
    // todo
  },
  onTimeChangeEnd: () => {
    // todo
  }
});
const remainingTime = 100;  // ms
cd.run(remainingTime);

setTimeout(() => 
  // 停止倒计时
  cd.stop();
}, 5000);

```
