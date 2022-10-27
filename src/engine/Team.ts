import { QuizbowlList } from "./QuizbowlList";
import { School } from "./School";

export class Team {
  school: School;
  number: number;

  constructor(school: School, number: number) {
    this.school = school;
    this.number = number;
  }

  toString(): string {
    return `${this.school.toString()} ${this.number}`;
  }
}

export class TeamList extends QuizbowlList<Team> {}
