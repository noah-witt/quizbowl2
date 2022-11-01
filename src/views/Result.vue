<template>
  <div>
    <h1>Result</h1>
    <v-alert prominent type="info">
      If you do not like these results you can:
      <router-link to="/generate">Regenerate</router-link> or
      <router-link to="/">Reconfigure</router-link>
    </v-alert>
    <h2>Teams</h2>
    <span v-for="(team, i) in schedule.teams" :key="i">
      {{ team.toString() }},
    </span>
    <h2>Rooms</h2>
    <span v-for="(room, i) in schedule.rooms" :key="i">
      {{ room.toString() }},
    </span>
    <h2>Rounds</h2>
    <div v-for="(round, i) in schedule.rounds" :key="i">
      <h3>Round {{ i + 1 }}</h3>
      <div v-for="(match, i) in round.matches" :key="i">
        {{ match.toString() }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useResult } from "@/stores/Result";
export default {
  name: "ScheduleResult",
  setup: () => {
    const resultStore = useResult();
    return { schedule: resultStore.getSchedule };
  },
};
</script>
