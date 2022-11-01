<template>
  <div>
    <h1>Generating...</h1>
    <span>Please Wait. This may take several minutes.</span>
    <v-alert prominent type="error" v-if="failed">
      Failed to Generate Schedule
      <router-link @click="work()" to="/generate">Retry</router-link> or
      <router-link to="/">Reconfigure</router-link>
      <v-divider></v-divider>
      <small>
        {{ errMsg }}
      </small>
    </v-alert>
  </div>
</template>

<script lang="ts">
const WORK_DELAY_MS = 100;
import { useConfiguration } from "@/stores/Configuration";
import { roomFactory } from "@/engine/RoomFactory";
import { TeamFactory } from "@/engine/TeamFactory";
import { ScheduleGenerator } from "@/engine/ScheduleGenerator";
import { useResult } from "@/stores/Result";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ScheduleGenerator",
  methods: {
    work() {
      this.failed = false;
      setTimeout(this.workInternal, WORK_DELAY_MS);
    },
    workInternal() {
      try {
        const roomObjects = roomFactory(this.rooms);
        const teamObjects = TeamFactory(this.schools);
        const schedule = ScheduleGenerator.generate(
          teamObjects,
          roomObjects,
          this.rules
        );
        this.failed = false;
        this.commitResult(schedule);
        this.$router.push("/result");
      } catch (ex) {
        this.failed = true;
        if (ex instanceof Error) {
          this.errMsg = ex.toString();
        } else {
          this.errMsg = "";
        }
      }
    },
  },
  data: () => {
    return {
      failed: false,
      errMsg: "",
    };
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
});
</script>

<style></style>
