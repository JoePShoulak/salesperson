const cityCount = 5;
const citySize = 10;
const bgColor = 20;
const textP = 10; // padding
const sizeOfText = 30;
const sigFig = 2; // for percent text

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
  title: () => text(`Algorithm: ${alg.toString()}`, textP, textP),

  progress: () => {
    display.title();

    const num = parseFloat(100 * alg.progress).toFixed(sigFig);
    text(`Calculating: ${num}%`, textP, 2 * textP + sizeOfText);

    drawRoute(alg.shortest.route, true);
    drawRoute(alg.current.route);
  },

  results: () => {
    display.title();

    text(
      `Shortest Route: ${alg.shortest.length.toFixed(2)}`,
      textP,
      textP * 2 + sizeOfText
    );
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
  textAlign(LEFT, TOP);

  const margin = 4 * textP + 2 * sizeOfText;

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
