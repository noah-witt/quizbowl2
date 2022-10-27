import { QuizbowlEngineException } from "./QuizbowlEngineException";
import { Room } from "./Room";
import { Ruleset } from "./Ruleset";
import { Schedule } from "./Schedule";
import { Team } from "./Team";

const MAX_TRIES = 100000;

export class ScheduleGenerator {
  static generate(
    teams: Team[],
    rooms: Room[],
    ruleset: Ruleset = new Ruleset()
  ): Schedule {
    for (let i = 0; i < MAX_TRIES; i++) {
      try {
        const schedule = new Schedule(teams, rooms, ruleset);
        schedule.ensureValid();
        return schedule;
      } catch (ex) {
        // console.log(ex);
      }
    }
    throw new QuizbowlEngineException(
      "Failed to generate schedule within try limit."
    );
  }
}
