import { Ruleset } from "@/engine/Ruleset";
import { defineStore } from "pinia";

interface ConfigurationState {
  schools: { name: string; numberOfTeams: number }[];
  rooms: string[];
  ruleset: Ruleset;
}

export const useConfiguration = defineStore("Configuration", {
  state: () => {
    const temp: ConfigurationState = {
      schools: [],
      rooms: [],
      ruleset: new Ruleset(),
    };
    return temp;
  },
  getters: {
    getSchools: (state) => {
      return state.schools;
    },
    getRooms: (state) => {
      return state.rooms;
    },
    getRules: (state) => {
      return state.ruleset;
    },
  },
  actions: {
    set(
      schools: { name: string; numberOfTeams: number }[],
      rooms: string[],
      ruleset: Ruleset
    ) {
      this.schools = schools;
      this.rooms = rooms;
      this.ruleset = ruleset;
    },
  },
});
