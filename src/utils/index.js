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

module.exports = {
  Stream,
};
