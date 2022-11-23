class NaiveBruteForce {
  constructor(points) {
    this.name = "Naive Brute Force";

    this.points = points;
    this.totalCalcs = factorial(this.points.length);

    this.routes = getAllPermutations(points);
    this.gen = this.generator();
    this.done = false;

    this.current = {
      route: null,
      length: null,
      index: null,
    };

    this.shortest = {
      ...this.current,
      length: Number.MAX_VALUE,
    };
  }

  get progress() {
    return (this.current.index + 1) / this.totalCalcs;
  }

  next() {
    return (this.done = this.gen.next().done);
  }

  run() {
    while (!this.done) this.next();
  }

  *generator() {
    this.current.index = 0;

    while (this.current.index < this.totalCalcs) {
      this.current.route = this.routes[this.current.index++];
      this.current.length = lengthOf(this.current.route);

      if (this.current.length < this.shortest.length) {
        this.shortest = { ...this.current };
      }

      yield this.current.route;
    }
  }
}
