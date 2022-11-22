// Borrowed this
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
function getAllPermutations(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur,
      memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);

      if (arr.length === 0) results.push(memo.concat(cur));
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

const factorial = (n) => [...Array(n).keys()].reduce((a, v) => a * (v + 1), 1);

const distance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const lengthOf = (line) => {
  return line.slice(1).reduce((acc, val, i) => acc + distance(val, line[i]), 0);
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
};

const map = (val, cMin, cMax, nMin, nMax) => {
  const ratio = (nMax - nMin) / (cMax - cMin);
  return (val - cMin) * ratio + nMin;
};

const shuffle = (arr) => {
  const rand = () => Math.floor(Math.random() * arr.length);
  for (let _ = 0; _ < arr.length; _++) arr = swap(arr, rand(), rand());

  return arr;
};

function pad(num, digits) {
  while (num.toString().length < digits) num = `0${num}`;
  return num;
}

function displayTime(t) {
  let ms = pad(t % 1000, 3);
  t = (t - ms) / 1000;

  const s = pad(t % 60, 2);
  t = (t - s) / 60;

  const m = pad(t % 60, 2);
  t = (t - m) / 60;

  return `${m}:${s}.${ms}`;
}

class Timer {
  constructor() {
    this.start = new Date();
  }

  stop() {
    console.log(displayTime(new Date() - this.start));
  }
}
