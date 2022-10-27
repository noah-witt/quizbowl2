export class QuizbowlList<T> extends Array<T> {
  constructor(list?: Array<T>) {
    super();
    if (!list) return;
    if (!(list instanceof Array)) return;
    for (const element of list) {
      this.push(element);
    }
  }

  popRandom(): T {
    const index = Math.floor(Math.random() * this.length);
    return this.splice(index, 1)[0];
  }

  copy(): QuizbowlList<T> {
    return new QuizbowlList<T>([...this]);
  }
}
