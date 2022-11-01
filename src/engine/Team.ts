import { QuizbowlList } from "./QuizbowlList";
import { School } from "./School";

export class Team {
  school: School;
  number: number;
  readonly symbol: symbol;

  constructor(school: School, number: number) {
    this.school = school;
    this.number = number;
    this.symbol = Symbol();
  }

  toString(): string {
    return `${this.school.toString()} ${this.number}`;
  }
}

export class TeamList extends QuizbowlList<Team> {}
