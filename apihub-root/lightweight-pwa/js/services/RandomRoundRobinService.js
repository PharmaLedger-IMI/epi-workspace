class RandomRoundRobinService {
  constructor(values = []) {
    if (values && !Array.isArray(values)) {
      throw new Error('RoundRobin constructor: values must be an array');
    }

    this.initialValues = values;
    this.currentkey = 0;
    this.currentTurn = null;
    this.init()
  }

  init() {
    this.items = new Map();
    this.round = new Set();
    this.initialValues.forEach((value) => this.add(value));
  }

  add(value) {
    const key = this.currentkey;
    this.items.set(key, {key, value});
    this.currentkey++;
    return this.items.get(key);
  }

  next() {
    if (this.items.size === 0) {
      return null;
    }

    if (this.currentTurn === null) {
      this.currentTurn = this.nextTurn();
    }

    const item = this.currentTurn;
    this.currentTurn = this.nextTurn();
    return item;
  }

  deleteByKey(key) {
    if (!this.items.has(key)) {
      return false;
    }

    if (this.currentTurn && this.currentTurn.key === key) {
      this.currentTurn = this.nextTurn();
    }

    this.round.delete(key);
    return this.items.delete(key);
  }

  nextTurn() {
    if (this.currentTurn === null) {
      const keys = Array.from(this.items.keys());
      this.round = new Set(keys);
    }

    if (this.round.size === 0) {
      return null;
    }

    const roundKeys = Array.from(this.round);
    const selectedKey = roundKeys[Math.floor(Math.random() * roundKeys.length)];
    this.round.delete(selectedKey);
    return this.items.get(selectedKey);
  }

  count() {
    return this.items.size;
  }


  clear() {
    this.items = new Map();
    this.round = new Set();
    this.currentkey = 0;
    this.currentTurn = null;
    this.initialValues = [];
    return this;
  }

  deleteByValue(cb) {
    let deleted = 0;
    this.items.forEach(({key, value}) => {
      if (cb(value)) {
        this.deleteByKey(key);
        deleted += 1;
      }
    });
    return deleted;
  }

  reset() {
    this.currentkey = 0;
    this.currentTurn = null;
    return this;
  }

}

export default RandomRoundRobinService;

