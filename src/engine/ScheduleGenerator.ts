import { QuizbowlEngineException } from "./QuizbowlEngineException";
import { Room } from "./Room";
import { Ruleset } from "./Ruleset";
import { Schedule } from "./Schedule";
import { Team } from "./Team";

const MAX_TRIES = 10000;

export class ScheduleGenerator {
  static generate(
    teams: Team[],
    rooms: Room[],
    ruleset: Ruleset = new Ruleset()
  ): Schedule {
    const errorCounts: Map<string, number> = new Map();
    for (let i = 0; i < MAX_TRIES; i++) {
      try {
        const schedule = new Schedule(teams, rooms, ruleset);
        schedule.ensureValid();
        return schedule;
      } catch (ex) {
        // @ts-expect-error it is unknown
        const errorString: string = ex.toString();
        errorCounts.set(errorString, (errorCounts.get(errorString) || 0) + 1);
      }
    }
    let errorStr = "Failed to generate schedule within try limit.\n";
    errorCounts.forEach((val, key) => {
      errorStr += `${key}: ${val}` + "\n";
    });
    throw new QuizbowlEngineException(errorStr);
  }
}
