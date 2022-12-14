const cityCount = 6;
const citySize = 10;
const sigFig = 2;
const bgColor = 20;
const txPad = 10;
const txSize = 30;
const margin = 4 * txPad + 2 * txSize;

let cities = [];
let alg;
let gen;
let timer;

const getTextPosition = (n) => [txPad, txPad + (txPad + txSize) * n];
const textPos = [getTextPosition(0), getTextPosition(1)];

// Helper for all our draw actions
const display = {
  title: () => text(`Algorithm: ${alg.name}`, ...textPos[0]),

  route: (route, bold = false) => {
    if (bold) {
      strokeWeight(2);
      stroke("white");
    } else {
      strokeWeight(1);
      stroke(128);
    }

    let oldCity;
    route.forEach((city) => {
      circle(city.x, city.y, citySize);

      if (oldCity) line(oldCity.x, oldCity.y, city.x, city.y);

      oldCity = city;
    });
  },

  progress: () => {
    strokeWeight(1);
    display.title();

    const num = parseFloat(100 * alg.progress).toFixed(sigFig);
    text(`Calculating: ${num}%`, ...textPos[1]);

    display.route(alg.shortest.route, true);
    display.route(alg.current.route);
  },

  results: () => {
    strokeWeight(1);
    display.title();

    const num = alg.shortest.length.toFixed(sigFig);
    text(`Shortest Route: ${num}`, ...textPos[1]);

    display.route(alg.shortest.route, true);
  },

  state: () => display[alg.done ? "results" : "progress"](),
};

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  background(bgColor);
  display.state();
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(bgColor);
  fill("white");
  textSize(txSize);
  textAlign(LEFT, TOP);

  for (let i = 0; i < cityCount; i++) {
    cities.push({
      x: random(margin, width - margin),
      y: random(margin, height - margin),
    });
  }

  alg = new BruteForce(cities);
  timer = new Timer();
}

function draw() {
  background(bgColor);

  alg.next();
  display.state();

  if (alg.done) {
    timer.stop();
    noLoop();
  }
}
