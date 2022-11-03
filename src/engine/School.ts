export class School {
  private name: string;
  readonly symbol: symbol;

  constructor(name: string) {
    this.name = name;
    this.symbol = Symbol(this.toString());
  }

  toString(): string {
    return this.name;
  }
}
