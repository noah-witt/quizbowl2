import { RegularMatch } from "@/engine/Match";
import { QuizbowlEngineException } from "@/engine/QuizbowlEngineException";
import { roomFactory } from "@/engine/RoomFactory";
import { Ruleset } from "@/engine/Ruleset";
import { ScheduleGenerator } from "@/engine/ScheduleGenerator";
import { TeamFactory } from "@/engine/TeamFactory";

expect.extend({
  toBeDistinct(received) {
    const pass =
      Array.isArray(received) && new Set(received).size === received.length;
    if (pass) {
      return {
        message: () => `expected [${received}] array is unique`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected [${received}] array is not to unique`,
        pass: false,
      };
    }
  },
});

describe("Engine Testing", () => {
  it("School Factory Test One", () => {
    const result = TeamFactory([{ name: "a", numberOfTeams: 1 }]);
    expect(result[0].school.toString()).toMatch("a");
    expect(result[0].number).toEqual(1);
  });

  it("School Factory Test Two", () => {
    const result = TeamFactory([
      { name: "a", numberOfTeams: 1 },
      { name: "b", numberOfTeams: 2 },
    ]);
    expect(result[0].school.toString()).toMatch("a");
    expect(result[0].number).toEqual(1);
    expect(result[1].school.toString()).toMatch("b");
    expect(result[1].number).toEqual(1);
    expect(result[2].school.toString()).toMatch("b");
    expect(result[2].number).toEqual(2);
  });

  it("room factory test", () => {
    const result = roomFactory(["A123", "B2", "C3"]);
    expect(result[0].toString()).toMatch("A (A123)");
    expect(result[1].toString()).toMatch("B (B2)");
    expect(result[2].toString()).toMatch("C (C3)");
  });

  it("room factory test", () => {
    const result = roomFactory(["A123", "B2", "C3"]);
    expect(result[0].toString()).toMatch("A (A123)");
    expect(result[1].toString()).toMatch("B (B2)");
    expect(result[2].toString()).toMatch("C (C3)");
  });

  it("gen test 1", () => {
    const rooms = roomFactory(["A123"]);
    const teams = TeamFactory([
      { name: "a", numberOfTeams: 1 },
      { name: "b", numberOfTeams: 1 },
    ]);
    const ruleset = new Ruleset();
    ruleset.numberOfRounds = 1;
    const schedule = ScheduleGenerator.generate(teams, rooms, ruleset);
    schedule.ensureValid();
    expect(schedule.roundsLength()).toEqual(1);
    const round = schedule.getRound(0);
    expect(round.matchesLength()).toEqual(1);
    const match = round.getMatch(0);
    expect(match.isBye()).toBe(false);
    const matchTeams = match.getTeams();
    expect(matchTeams.length).toEqual(2);
    expect(matchTeams).toEqual(expect.arrayContaining([teams[0], teams[1]]));
  });

  it("gen test 2", () => {
    const rooms = roomFactory(["A123", "B456"]);
    const teams = TeamFactory([
      { name: "a", numberOfTeams: 2 },
      { name: "b", numberOfTeams: 2 },
    ]);
    const ruleset = new Ruleset();
    ruleset.numberOfRounds = 2;
    const schedule = ScheduleGenerator.generate(teams, rooms, ruleset);
    schedule.ensureValid();
    expect(schedule.roundsLength()).toEqual(2);
    {
      // round 0
      const round = schedule.getRound(0);
      expect(round.matchesLength()).toEqual(2);
      const match = round.getMatch(0);
      expect(match.isBye()).toBe(false);
      const matchTeams = match.getTeams();
      expect(matchTeams.length).toEqual(2);
      const team1 = matchTeams[0];
      const team2 = matchTeams[1];
      expect(team1.school).not.toEqual(team2.school);
      const match2 = round.getMatch(1);
      expect(match2.isBye()).toBe(false);
      const match2Teams = match2.getTeams();
      expect(match2Teams.length).toEqual(2);
      const team3 = match2Teams[0];
      const team4 = match2Teams[1];
      expect(team3.school).not.toEqual(team4.school);
      // @ts-expect-error toBeDistinct is missing on the type
      expect([team1, team2, team3, team4]).toBeDistinct();
      expect(match instanceof RegularMatch).toBe(true);
      if (!(match instanceof RegularMatch)) {
        throw new Error("match must be a regular match");
      }
      expect(match2 instanceof RegularMatch).toBe(true);
      if (!(match2 instanceof RegularMatch)) {
        throw new Error("match must be a regular match");
      }
      // @ts-expect-error toBeDistinct is missing on the type
      expect([match.getRoom(), match2.getRoom()]).toBeDistinct();
      expect([match.getRoom(), match2.getRoom()]).toEqual(
        expect.arrayContaining(rooms)
      );
    }
    {
      // round 1
      const round = schedule.getRound(1);
      expect(round.matchesLength()).toEqual(2);
      const match = round.getMatch(0);
      expect(match.isBye()).toBe(false);
      const matchTeams = match.getTeams();
      expect(matchTeams.length).toEqual(2);
      const team1 = matchTeams[0];
      const team2 = matchTeams[1];
      expect(team1.school).not.toEqual(team2.school);
      const match2 = round.getMatch(1);
      expect(match2.isBye()).toBe(false);
      const match2Teams = match2.getTeams();
      expect(match2Teams.length).toEqual(2);
      const team3 = match2Teams[0];
      const team4 = match2Teams[1];
      expect(team3.school).not.toEqual(team4.school);
      // @ts-expect-error toBeDistinct is missing on the type
      expect([team1, team2, team3, team4]).toBeDistinct();
      expect(match instanceof RegularMatch).toBe(true);
      if (!(match instanceof RegularMatch)) {
        throw new Error("match must be a regular match");
      }
      expect(match2 instanceof RegularMatch).toBe(true);
      if (!(match2 instanceof RegularMatch)) {
        throw new Error("match must be a regular match");
      }
      // @ts-expect-error toBeDistinct is missing on the type
      expect([match.getRoom(), match2.getRoom()]).toBeDistinct();
      expect([match.getRoom(), match2.getRoom()]).toEqual(
        expect.arrayContaining(rooms)
      );
    }
  });
});

it("gen test room limit", () => {
  const rooms = roomFactory(["A123", "b456"]);
  const teams = TeamFactory([
    { name: "a", numberOfTeams: 1 },
    { name: "b", numberOfTeams: 1 },
  ]);
  const ruleset = new Ruleset();
  ruleset.maxTimesInSameRoom = 3;
  ruleset.teamCanNotPlaySameTeamTwice = false;
  const schedule = ScheduleGenerator.generate(teams, rooms, ruleset);
  schedule.ensureValid();
  // should play in each room 50%
  const counts: { [key: symbol]: number } = {};
  const symbols: Set<symbol> = new Set();
  for (const round of schedule.rounds) {
    for (const match of round.matches) {
      if (!(match instanceof RegularMatch)) {
        throw new QuizbowlEngineException("Not the right match type");
      }
      const room = match.getRoom();
      if (!Object.prototype.hasOwnProperty.call(counts, room.symbol)) {
        counts[room.symbol] = 0;
      }
      counts[room.symbol] += 1;
      symbols.add(room.symbol);
    }
  }

  symbols.forEach((sym) => {
    expect(counts[sym]).toEqual(3);
  });
});

function matchUpCounter(
  obj: { [key: symbol]: { [key: symbol]: number } },
  a: symbol,
  b: symbol
) {
  if (!Object.prototype.hasOwnProperty.call(obj, a)) {
    obj[a] = {};
  }
  if (!Object.prototype.hasOwnProperty.call(obj[a], b)) {
    obj[a][b] = 0;
  }
  obj[a][b] += 1;
}

it("gen test maxTimesAgainstSameSchool", () => {
  const rooms = roomFactory([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
  ]);
  const teams = TeamFactory([
    { name: "a", numberOfTeams: 2 },
    { name: "b", numberOfTeams: 2 },
    { name: "c", numberOfTeams: 2 },
    { name: "d", numberOfTeams: 2 },
    { name: "e", numberOfTeams: 2 },
    { name: "f", numberOfTeams: 2 },
    { name: "g", numberOfTeams: 2 },
    { name: "h", numberOfTeams: 2 },
    { name: "i", numberOfTeams: 2 },
    { name: "j", numberOfTeams: 2 },
    { name: "k", numberOfTeams: 2 },
  ]);
  const ruleset = new Ruleset();
  ruleset.maxTimesAgainstSameSchool = 1;
  ruleset.numberOfRounds = 4;
  ruleset.teamCanNotPlaySameTeamTwice = true;
  const schedule = ScheduleGenerator.generate(teams, rooms, ruleset);
  schedule.ensureValid();
  const counts: { [key: symbol]: { [key: symbol]: number } } = {};
  const teamSymbols: Set<symbol> = new Set();
  for (const round of schedule.rounds) {
    for (const match of round.matches) {
      if (!(match instanceof RegularMatch)) {
        throw new QuizbowlEngineException("Not the right match type");
      }
      const teams = match.getTeams();
      teamSymbols.add(teams[0].symbol);
      teamSymbols.add(teams[1].symbol);
      matchUpCounter(counts, teams[0].symbol, teams[1].school.symbol);
      matchUpCounter(counts, teams[1].symbol, teams[0].school.symbol);
    }
  }

  teamSymbols.forEach((sym) => {
    teamSymbols.forEach((sym2) => {
      if (Object.prototype.hasOwnProperty.call(counts[sym], sym2)) {
        expect(counts[sym][sym2]).toEqual(1);
      }
    });
  });
});
