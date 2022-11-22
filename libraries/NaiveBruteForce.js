class NaiveBruteForce {
  constructor(points) {
    this.points = points;
    this.progress = 0;
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

  next() {
    const { value, done } = this.gen.next();

    this.done = done;

    return value;
  }

  *generator() {
    this.current.index = 0;

    while (this.current.index < this.totalCalcs) {
      this.current.route = this.routes[this.current.index];
      this.current.length = lengthOf(this.current.route);

      if (this.current.length < this.shortest.length) {
        this.shortest = { ...this.current };
      }

      this.progress = (this.current.index + 1) / this.totalCalcs;

      yield this.current.route;
      this.current.index++;
    }
  }
}
