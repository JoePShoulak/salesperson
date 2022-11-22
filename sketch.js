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
 */
const cityCount = 5;
const citySize = 10;
const margin = 50;
const bgColor = 20;
const textOffset = 10;
const sigFig = 1;

let cities = [];
let routes;
let textLocation;
let finished = false;
let shortestLength = Number.MAX_VALUE;
let shortestRoute;
let startTime;

let NBF;
let gen;

function drawRoute(route) {
  let oldCity;
  route.forEach((city) => {
    circle(city.x, city.y, citySize);
    if (oldCity) line(oldCity.x, oldCity.y, city.x, city.y);
    oldCity = city;
  });
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(bgColor);
  fill("white");
  stroke("white");
  textLocation = [textOffset, margin / 2 + textOffset];

  for (let i = 0; i < cityCount; i++) {
    const x = random(0, width);
    const y = random(margin, height);

    cities.push({ x, y });
  }

  NBF = new NaiveBruteForce(cities);
  routes = NBF.routes;
  noStroke();
  textSize(30);
  text(`Loading...`, ...textLocation);
  startTime = new Date();
}

function draw() {
  background(bgColor);
  fill("white");

  if (!NBF.next().done) {
    const route = NBF.current.route;
    const length = lengthOf(route);
    if (length < shortestLength) {
      shortestLength = length;
      shortestRoute = NBF.current.index;
    }

    const progress = (NBF.current.index + 1) / factorial(cities.length);

    noStroke();
    text(
      `Calculating: ${parseFloat(100 * progress).toFixed(sigFig)}%`,
      ...textLocation
    );

    strokeWeight(2);
    stroke("white");
    drawRoute(routes[shortestRoute]);
    strokeWeight(1);
    stroke(128);
    drawRoute(route);
  } else {
    noStroke();
    text(`Shortest Route: ${shortestLength}`, ...textLocation);
    stroke("white");
    strokeWeight(2);
    drawRoute(routes[shortestRoute]);
    noLoop();
    console.log(displayTime(new Date() - startTime));
  }
}
