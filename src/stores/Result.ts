import { QuizbowlEngineException } from "@/engine/QuizbowlEngineException";
import { Schedule } from "@/engine/Schedule";
import { defineStore } from "pinia";

interface ResultState {
  schedule: Schedule | null;
}

export const useResult = defineStore("Result", {
  state: () => {
    const temp: ResultState = {
      schedule: null,
    };
    return temp;
  },
  getters: {
    getSchedule: (state) => {
      if (state.schedule == null)
        throw new QuizbowlEngineException("Schedule Not Generated");
      return state.schedule;
    },
  },
  actions: {
    set(schedule: Schedule) {
      console.log("committing schedule");
      console.log(schedule);
      this.schedule = schedule;
    },
  },
});
