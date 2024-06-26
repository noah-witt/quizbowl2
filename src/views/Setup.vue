<template>
  <div>
    <h1>Rooms</h1>
    <v-btn @click="addRoom()">Add Room</v-btn>
    <v-btn @click="removeRoom()">Remove Room</v-btn>
    <div v-for="room in rooms" :key="room.id">
      <v-text-field label="Room Number" v-model="room.number"></v-text-field>
    </div>
    <hr />
    <h1>Teams</h1>
    <v-btn @click="addSchool()">Add School</v-btn>
    <v-btn @click="removeSchool()">Remove School</v-btn>
    <br />
    <br />
    <div v-for="school in schools" :key="school.id">
      <v-row>
        <v-text-field label="School Name" v-model="school.name"></v-text-field>
        <v-text-field
          label="Number Of Teams"
          v-model="school.numberOfTeams"
          type="number"
        ></v-text-field>
      </v-row>
    </div>
    <div>
      <h2>Settings</h2>
      <v-text-field
        label="Number of Rounds"
        v-model="rules.numberOfRounds"
        type="number"
      ></v-text-field>
      <v-text-field
        label="Maximum Number Of Times A Team May Play the Same School (Set to zero for unlimited)"
        v-model="rules.maxTimesAgainstSameSchool"
        type="number"
      ></v-text-field>
      <v-text-field
        label="Maximum Number Of Times A Team May Play In The Same Room (Set to zero for unlimited)"
        v-model="rules.maxTimesInSameRoom"
        type="number"
      ></v-text-field>
    </div>
    <v-btn @click="submit()">Submit</v-btn>
    <br />
    <br />
    <v-btn @click="exportConfig()">Export Config</v-btn>
    <v-btn @click="importConfig()">Import Config</v-btn>
  </div>
</template>

<script lang="ts">
import { useConfiguration } from "@/stores/Configuration";
import { v4 as uuidv4 } from "uuid";
import { defineComponent, reactive } from "vue";
import { Ruleset } from "@/engine/Ruleset";
import { ExportSystem } from "./export";
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

export interface EventSetupData {
  rooms: Room[];
  schools: School[];
  rules: Ruleset;
}
export default defineComponent({
  name: "EventSetup",
  data: () => {
    const temp: EventSetupData = {
      rooms: reactive([]),
      schools: reactive([]),
      rules: new Ruleset(),
    };
    return reactive(temp);
  },
  setup() {
    const configStore = useConfiguration();
    return {
      setStore: configStore.set,
      getSchoolsStore: configStore.getSchools,
      getRoomsStore: configStore.getRooms,
      getRulesStore: configStore.getRules,
    };
  },
  mounted() {
    for (const school of this.getSchoolsStore) {
      this.schools.push({ id: uuidv4(), ...school });
    }
    for (const room of this.getRoomsStore) {
      this.rooms.push({ id: uuidv4(), number: room });
    }
    this.rules = this.getRulesStore;
  },
  computed: {},
  methods: {
    addRoom() {
      this.rooms.push(reactive(RoomFactory()));
    },
    addSchool() {
      this.schools.push(reactive(SchoolFactory()));
    },
    removeRoom() {
      this.rooms.pop();
    },
    removeSchool() {
      this.schools.pop();
    },
    submit() {
      const roomStrings = [];
      for (const room of this.rooms) {
        roomStrings.push(room.number);
      }
      this.setStore(this.schools, roomStrings, this.rules);
      console.warn({ that: this });
      this.$router.push("/generate");
    },
    async exportConfig() {
      const config = {
        schools: this.schools,
        rooms: this.rooms,
        rules: this.rules,
      };
      const jwt = await ExportSystem.exportConfig(config);
      const dataStr = "data:text;charset=utf-8," + encodeURIComponent(jwt);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "config.txt");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    async importConfig() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".txt";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const contents = e.target?.result;
            if (typeof contents === "string") {
              const config = await ExportSystem.importConfig(contents);
              this.schools = config.schools;
              this.rooms = config.rooms;
              this.rules = config.rules;
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    },
  },
});
</script>

<style></style>
