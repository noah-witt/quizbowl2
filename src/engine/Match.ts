import { QuizbowlEngineException } from "./QuizbowlEngineException";
import { Room } from "./Room";
import { Team } from "./Team";

export class Match {
  isSameSchool(): boolean {
    return false;
  }

  toString(): string {
    throw new QuizbowlEngineException(
      "You should not create an instance of Match"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasTeam(team: Team) {
    return false;
  }

  getTeams(): Team[] {
    return [];
  }

  isBye(): boolean {
    return false;
  }
}

export class RegularMatch extends Match {
  private teamA: Team;
  private teamB: Team;
  private room: Room;

  constructor(teamA: Team, teamB: Team, room: Room) {
    super();
    this.teamA = teamA;
    this.teamB = teamB;
    this.room = room;
  }

  isSameSchool(): boolean {
    return this.teamA.school == this.teamB.school;
  }

  toString(): string {
    return `${this.teamA.toString()} vs ${this.teamB.toString()} in ${this.room.toString()}`;
  }

  hasTeam(team: Team) {
    return this.teamA === team || this.teamB === team;
  }

  getTeams(): Team[] {
    return [this.teamA, this.teamB];
  }
}

export class ByeRound extends Match {
  private team: Team;

  constructor(team: Team) {
    super();
    this.team = team;
  }

  toString(): string {
    return `${this.team.toString()} has a bye`;
  }

  hasTeam(team: Team) {
    return this.team === team;
  }

  isBye(): boolean {
    return true;
  }
}
