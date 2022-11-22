class NaiveBruteForce {
  constructor(points) {
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

  get active() {
    return !this.done;
  }

  get progress() {
    return (this.current.index + 1) / this.totalCalcs;
  }

  next() {
    this.done = this.gen.next().done;
  }

  toString() {
    return "Naive Brute Force";
  }

  _setShortest() {
    this.shortest = { ...this.current };
  }

  *generator() {
    this.current.index = 0;

    while (this.current.index < this.totalCalcs) {
      this.current.route = this.routes[this.current.index];
      this.current.length = lengthOf(this.current.route);

      if (this.current.length < this.shortest.length) this._setShortest();

      yield this.current.route;
      this.current.index++;
    }
  }
}
