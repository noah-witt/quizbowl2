export class School {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}
