import { defineStore } from "pinia";

interface ConfigurationState {
  schools: { name: string; numberOfTeams: number }[];
  rooms: string[];
}

export const useConfiguration = defineStore("Configuration", {
  state: () => {
    const temp: ConfigurationState = {
      schools: [],
      rooms: [],
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
  },
  actions: {
    set(schools: { name: string; numberOfTeams: number }[], rooms: string[]) {
      this.schools = schools;
      this.rooms = rooms;
    },
  },
});
