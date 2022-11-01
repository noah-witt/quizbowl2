export class School {
  private name: string;
  readonly symbol: symbol;

  constructor(name: string) {
    this.name = name;
    this.symbol = Symbol();
  }

  toString(): string {
    return this.name;
  }
}
