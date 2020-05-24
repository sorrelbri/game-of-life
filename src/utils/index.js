class Stream {
  constructor(head, next) {
    this.head = head;
    this.tail = next;
    this.memo = false;
  }
  get next() {
    if (!this.memo) {
      this.tail = this.tail();
      this.memo = true;
    }
    return this.tail;
  }
}

const getNeighbors = (key) => {
  const [x, y] = key.split(",").map((str) => parseInt(str));
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ].map((arr) => arr.join(","));
};

module.exports = {
  Stream,
  getNeighbors,
};
