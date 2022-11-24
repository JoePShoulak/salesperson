function getAllPermutations(arr) {
  const allPermutations = [[...arr]];
  const iArray = arr.map((_, i) => i);

  for (let i = 1; i < factorial(iArray.length); i++) {
    let x = iArray.length - 2;
    while (true) if (iArray[x] < iArray[x + 1] || --x < 0) break;
    if (x < 0) return null;

    let y = iArray.length - 1;
    while (true) if (iArray[x] < iArray[y] || --y < 0) break;

    swap(iArray, x, y);
    iArray.push(...iArray.splice(x + 1).reverse());

    allPermutations.push(iArray.map((i) => arr[i]));
  }

  return allPermutations;
}

const factorial = (n) => (n > 1 ? n * factorial(n - 1) : 1);

const distTo = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const lengthOf = (l) => l.slice(1).reduce((a, v, i) => a + distTo(v, l[i]), 0);

const swap = (a, i, j) => ([a[i], a[j]] = [a[j], a[i]]);

const map = (val, cMin, cMax, nMin, nMax) => {
  const ratio = (nMax - nMin) / (cMax - cMin);
  return (val - cMin) * ratio + nMin;
};

function pad(num, digits) {
  while (num.toString().length < digits) num = `0${num}`;
  return num;
}

function displayTime(t) {
  const ms = pad(t % 1000, 3);
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
