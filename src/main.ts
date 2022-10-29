import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
