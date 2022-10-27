import { ByeRound, Match, RegularMatch } from "./Match";
import { QuizbowlEngineException } from "./QuizbowlEngineException";
import { RoomList } from "./Room";
import { Team, TeamList } from "./Team";

declare function Callback(match: Match, index: number): unknown;

export class Round {
  private matches: Match[] = [];

  getMatch(round: number): Match {
    return this.matches[round];
  }

  matchesLength(): number {
    return this.matches.length;
  }

  constructor(teams: TeamList, rooms: RoomList, allowBye = false) {
    this.generateRound(teams, rooms, allowBye);
  }

  private generateMatch(teams: TeamList, rooms: RoomList) {
    const teamA = teams.popRandom();
    const teamB = teams.popRandom();
    const room = rooms.popRandom();
    return new RegularMatch(teamA, teamB, room);
  }

  private generateRound(teams: TeamList, rooms: RoomList, allowBye: boolean) {
    const teamsCopy = teams.copy();
    const roomsCopy = rooms.copy();
    this.ensureSafeToGenerateRound(teamsCopy, allowBye, roomsCopy);
    this.generateMatches(teamsCopy, roomsCopy);
    this.generateBye(teamsCopy);
  }

  private generateBye(teams: TeamList) {
    while (teams.length > 0) {
      const match = new ByeRound(teams.popRandom());
      this.matches.push(match);
    }
  }

  private generateMatches(teams: TeamList, rooms: RoomList) {
    while (teams.length > 1) {
      const match = this.generateMatch(teams, rooms);
      this.matches.push(match);
    }
  }

  private ensureSafeToGenerateRound(
    teams: TeamList,
    allowBye: boolean,
    rooms: RoomList
  ) {
    if (teams.length % 2 === 1 && !allowBye) {
      throw new QuizbowlEngineException(
        "There must be an even number of teams if teams are not allowed a bye."
      );
    }
    if (this.matches.length > 0) {
      throw new QuizbowlEngineException(
        "You can not generate a round after it has already been generated."
      );
    }
    if (rooms.length < teams.length / 2) {
      throw new QuizbowlEngineException(
        "There must be at least half as many rooms as teams."
      );
    }
  }

  forEach(callback: typeof Callback) {
    this.matches.forEach(callback);
  }

  getTeamMatch(team: Team): Match {
    for (const match of this.matches) {
      if (match.hasTeam(team)) {
        return match;
      }
    }
    throw new QuizbowlEngineException("Team Match Not Found");
  }
}
