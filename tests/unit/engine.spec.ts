import { Room } from "@/engine/Room";
import { roomFactory } from "@/engine/RoomFactory";
import { Ruleset } from "@/engine/Ruleset";
import { ScheduleGenerator } from "@/engine/ScheduleGenerator";
import { TeamFactory } from "@/engine/TeamFactory";

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

});
