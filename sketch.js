/**
 * NAIVE BRUTE FORCE
 *
 * Test times
 * f: mm:ss.ms
 * 3: 00:00.087
 * 4: 00:00.308
 * 5: 00:01.483
 * 6: 00:08.755
 * 7: 01:44.919
 *
 */
const cityCount = 8;
const citySize = 10;
const bgColor = 20;
const textPadding = 10;
const sizeOfText = 30;
const sigFig = 1; // for percent text

let cities = [];
let textLocation;

let alg;
let gen;
let timer;

function drawRoute(route, bold = false) {
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
}

const display = {
  progress: () => {
    const num = parseFloat(100 * alg.progress).toFixed(sigFig);
    text(`Calculating: ${num}%`, ...textLocation);

    drawRoute(alg.shortest.route, true);
    drawRoute(alg.current.route);
  },

  results: () => {
    text(`Shortest Route: ${alg.shortest.length}`, ...textLocation);
    drawRoute(alg.shortest.route, true);
  },
};

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(bgColor);
  fill("white");
  textSize(sizeOfText);

  const margin = 2 * textPadding + sizeOfText;
  textLocation = [textPadding, margin / 2 + textPadding];

  for (let i = 0; i < cityCount; i++) {
    const x = random(0, width);
    const y = random(margin, height);

    cities.push({ x, y });
  }

  alg = new NaiveBruteForce(cities);
  timer = new Timer();
}

function draw() {
  background(bgColor);

  alg.next();
  if (alg.active) {
    display.progress();
  } else {
    timer.stop();
    display.results();
    noLoop();
  }
}
