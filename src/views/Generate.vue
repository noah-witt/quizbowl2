<template>
  <div>
    <h1>Generating...</h1>
    <span>Please Wait. This may take several minutes.</span>
  </div>
</template>

<script>
const WORK_DELAY_MS = 100;
import { useConfiguration } from "@/stores/Configuration";
import { roomFactory } from "@/engine/RoomFactory";
import { TeamFactory } from "@/engine/TeamFactory";
import { Ruleset } from "@/engine/Ruleset";
import { ScheduleGenerator } from "@/engine/ScheduleGenerator";
import { useResult } from "@/stores/Result";
export default {
  name: "ScheduleGenerator",
  methods: {
    work() {
      console.info("Generating Schedule");
      const roomObjects = roomFactory(this.rooms);
      const teamObjects = TeamFactory(this.schools);
      const schedule = ScheduleGenerator.generate(
        teamObjects,
        roomObjects,
        this.rules
      );
      console.info(schedule); //TODO set in store and then forward.
      this.commitResult(schedule);
      this.$router.push("/result");
    },
  },
  mounted() {
    setTimeout(this.work, WORK_DELAY_MS);
  },
  setup: () => {
    const configStore = useConfiguration();
    const resultStore = useResult();
    return {
      schools: configStore.getSchools,
      rooms: configStore.getRooms,
      rules: configStore.getRules,
      commitResult: resultStore.set,
    };
  },
};
</script>

<style></style>
