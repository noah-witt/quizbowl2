<template>
  <div>
    <h1>Rooms</h1>
    <v-btn @click="addRoom()">Add Room</v-btn>
    <v-btn @click="removeRoom()">Remove Room</v-btn>
    <div v-for="room in rooms" :key="room.id">
      <v-text-field label="Room Number" v-model="room.number"></v-text-field>
      {{ room.id }}
    </div>
    <hr />
    <h1>Teams</h1>
    <v-btn @click="addSchool()">Add School</v-btn>
    <v-btn @click="removeSchool()">Remove School</v-btn>
    <div v-for="school in schools" :key="school.id">
      <v-text-field label="School Name" v-model="school.name"></v-text-field>
      <v-text-field
        label="Number Of Teams"
        v-model="school.numberOfTeams"
        type="number"
      ></v-text-field>
      {{ school.id }}
    </div>
    <v-btn @click="submit()">Submit</v-btn>
  </div>
</template>

<script lang="ts">
import { useConfiguration } from "@/stores/Configuration";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
interface School {
  name: string;
  numberOfTeams: number;
  id: string;
}

function SchoolFactory(): School {
  return {
    id: uuidv4(),
    name: "",
    numberOfTeams: 1,
  };
}
interface Room {
  number: string;
  id: string;
}

function RoomFactory(): Room {
  return {
    id: uuidv4(),
    number: "",
  };
}

interface EventSetupData {
  rooms: Room[];
  schools: School[];
}
export default {
  name: "EventSetup",
  data: () => {
    const temp: EventSetupData = {
      rooms: reactive([]),
      schools: reactive([]),
    };
    return reactive(temp);
  },
  setup: () => {
    const configStore = useConfiguration();
    return { setStore: configStore.set };
  },
  computed: {},
  methods: {
    addRoom() {
      // @ts-expect-error Something weird
      this.rooms.push(reactive(RoomFactory()));
    },
    addSchool() {
      // @ts-expect-error Something weird
      this.schools.push(reactive(SchoolFactory()));
    },
    removeRoom() {
      // @ts-expect-error Something weird
      this.rooms.pop();
    },
    removeSchool() {
      // @ts-expect-error Something weird
      this.schools.pop();
    },
    submit() {
      const roomStrings = [];
      // @ts-expect-error Something weird
      for (const room of this.rooms) {
        roomStrings.push(room.number);
      }
      // @ts-expect-error Something weird
      this.setStore(this.schools, roomStrings);
      console.warn({ that: this });
      // @ts-expect-error Something weird
      this.$router.push("/generate");
    },
  },
};
</script>

<style></style>
