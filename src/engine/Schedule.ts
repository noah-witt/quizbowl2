import { RegularMatch } from "./Match";
import { QuizbowlEngineException } from "./QuizbowlEngineException";
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

type SymbolMapping<U> = {
  [key: symbol]: U;
};

type schoolLimitStruct = SymbolMapping<SymbolMapping<number>>;
type roomLimitStruct = SymbolMapping<SymbolMapping<number>>;

function safeGet<U>(map: SymbolMapping<U>, key: symbol, defaultValue: U): U {
  // eslint-disable-next-line no-prototype-builtins
  if (!map.hasOwnProperty(key)) {
    map[key] = defaultValue;
  }
  return map[key];
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
            "team has the same school competing against itself."
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
        throw new RuleEnforcementException("team plays the same team twice.");
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
          throw new RuleEnforcementException("team has too many bye rounds.");
        }
      }
    }
  }

  /**
   * Ensures that each team does not play a given school more than
   * maxMeetings times
   * @param maxMeetings the number of meetings
   */
  private ensureSchoolLimit(maxMeetings: number): void {
    const teamMatchups: schoolLimitStruct = {};
    for (const round of this.rounds) {
      for (const match of round.matches) {
        if (match instanceof RegularMatch) {
          this.recordSchoolMeets(match, teamMatchups);
        }
      }
    }
    for (const teamSymbol of Object.getOwnPropertySymbols(teamMatchups)) {
      for (const schoolSymbol of Object.getOwnPropertySymbols(
        teamMatchups[teamSymbol]
      )) {
        if (teamMatchups[teamSymbol][schoolSymbol] > maxMeetings)
          throw new QuizbowlEngineException(
            "Too many meetings against same school " +
              teamSymbol.toString() +
              " " +
              schoolSymbol.toString() +
              " " +
              teamMatchups[teamSymbol][schoolSymbol]
          );
      }
    }
  }

  private recordSchoolMeets(
    match: RegularMatch,
    teamMatchups: schoolLimitStruct
  ) {
    const teams = match.getTeams();
    const teamASchoolOps = safeGet(teamMatchups, teams[0].symbol, {});
    safeGet(teamASchoolOps, teams[1].school.symbol, 0);
    teamASchoolOps[teams[1].school.symbol] += 1;
    const teamBSchoolOps = safeGet(teamMatchups, teams[1].symbol, {});
    safeGet(teamBSchoolOps, teams[0].school.symbol, 0);
    teamBSchoolOps[teams[0].school.symbol] += 1;
  }

  /**
   * Ensures that each team does not play in a given room more than the limit times
   * @param maxRounds the number of meetings
   */
  private ensureRoomRounds(maxRounds: number): void {
    const roomRounds: roomLimitStruct = {};
    for (const round of this.rounds) {
      for (const match of round.matches) {
        if (match instanceof RegularMatch) {
          this.recordRoomRounds(match, roomRounds);
        }
      }
    }
    for (const teamSymbol of Object.getOwnPropertySymbols(roomRounds)) {
      for (const schoolSymbol of Object.getOwnPropertySymbols(
        roomRounds[teamSymbol]
      )) {
        if (roomRounds[teamSymbol][schoolSymbol] > maxRounds)
          throw new QuizbowlEngineException("Too many rounds in the same room");
      }
    }
  }

  private recordRoomRounds(match: RegularMatch, roomRounds: schoolLimitStruct) {
    const teams = match.getTeams();
    const teamMatchupSchoolsA = safeGet(roomRounds, teams[0].symbol, {});
    safeGet(teamMatchupSchoolsA, match.getRoom().symbol, 0);
    teamMatchupSchoolsA[match.getRoom().symbol] += 1;
    const teamMatchupSchoolsB = safeGet(roomRounds, teams[1].symbol, {});
    safeGet(teamMatchupSchoolsB, match.getRoom().symbol, 0);
    teamMatchupSchoolsB[match.getRoom().symbol] += 1;
  }

  ensureValid() {
    if (this.ruleset.schoolCanNotPlaySelf) this.doSchoolsPlaySelf();
    if (this.ruleset.teamCanNotPlaySameTeamTwice)
      this.doesTeamPlaySameTeamTwice();
    if (this.ruleset.byeRoundAllowed)
      this.doesExceedByesPerTeam(this.ruleset.maxByesPerTeam);
    if (this.ruleset.maxTimesAgainstSameSchool > 0)
      this.ensureSchoolLimit(this.ruleset.maxTimesAgainstSameSchool);
    if (this.ruleset.maxTimesInSameRoom)
      this.ensureRoomRounds(this.ruleset.maxTimesInSameRoom);
  }

  forEach(callback: typeof Callback) {
    this.rounds.forEach(callback);
  }
}
