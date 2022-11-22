class NaiveBruteForce {
  constructor(points) {
    this.points = points;

    this.routes = getAllPermutations(points);
    this.gen = this.generator();

    this.current = {
      route: null,
      length: null,
      index: null,
    };
  }

  next() {
    return this.gen.next();
  }

  *generator() {
    let index = 0;
    while (index < this.routes.length) {
      this.current.index = index;
      this.current.route = this.routes[index];
      this.current.length = lengthOf(this.current.route);

      yield this.current.route;
      index++;
    }
  }
}
