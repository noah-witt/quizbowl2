import { QuizbowlEngineException } from "./QuizbowlEngineException";
import { QuizbowlList } from "./QuizbowlList";
import { Room, RoomList } from "./Room";
import { Round } from "./Round";
import { Ruleset } from "./Ruleset";
import { Team, TeamList } from "./Team";

declare function Callback(match: Round, index: number): unknown;

class RuleEnforcementException extends QuizbowlEngineException {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: any) {
    super(message);
    this.name = "RuleEnforcementException";
  }
}

export class Schedule {
  // TODO Implement schedule
  readonly rounds: Round[];
  readonly teams: TeamList;
  readonly rooms: RoomList;
  readonly ruleset: Ruleset;

  getRound(round: number): Round {
    return this.rounds[round];
  }

  roundsLength(): number {
    return this.rounds.length;
  }

  constructor(teams: Team[], rooms: Room[], ruleset: Ruleset = new Ruleset()) {
    this.rounds = [];
    this.teams = new TeamList(teams);
    this.rooms = new RoomList(rooms);
    this.ruleset = ruleset;
    for (let i = 0; i < this.ruleset.numberOfRounds; i++) {
      this.rounds.push(
        new Round(this.teams, this.rooms, ruleset.byeRoundAllowed)
      );
    }
  }

  private doSchoolsPlaySelf(): void {
    this.forEach((round) => {
      round.forEach((match) => {
        if (match.isSameSchool()) {
          throw new RuleEnforcementException(
            match.toString() + " has the same school competing against itself."
          );
        }
      });
    });
  }

  private doesTeamPlaySameTeamTwice(): void {
    for (const team of this.teams) {
      let opponents: Team[] = [];
      for (const round of this.rounds) {
        const match = round.getTeamMatch(team);
        opponents = opponents.concat(
          match.getTeams().filter((value) => value !== team)
        );
      }
      if (new Set(opponents).size !== opponents.length) {
        throw new RuleEnforcementException(
          team.toString() + " plays the same team twice."
        );
      }
    }
  }

  private doesExceedByesPerTeam(maxByes: number): void {
    for (const team of this.teams) {
      let byeCount = 0;
      for (const round of this.rounds) {
        const match = round.getTeamMatch(team);
        if (match.isBye()) byeCount++;
        if (byeCount > maxByes) {
          throw new RuleEnforcementException(
            team.toString() + " has too many bye rounds."
          );
        }
      }
    }
  }

  ensureValid() {
    if (this.ruleset.schoolCanNotPlaySelf) this.doSchoolsPlaySelf();
    if (this.ruleset.teamCanNotPlaySameTeamTwice)
      this.doesTeamPlaySameTeamTwice();
    if (this.ruleset.byeRoundAllowed)
      this.doesExceedByesPerTeam(this.ruleset.maxByesPerTeam);
  }

  forEach(callback: typeof Callback) {
    this.rounds.forEach(callback);
  }
}
