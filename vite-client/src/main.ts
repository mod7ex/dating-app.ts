import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import basePlugin from "./plugins";
import axios from "axios";

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.use(basePlugin);

window.apiLocations = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 2000,
      headers: {
            // "Content-Type": "application/json",
            Accept: "application/json",
      },
});

window.api = axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 2000,
      headers: {
            // "Content-Type": "application/json",
            Accept: "application/json",
      },
});

app.mount("#app");
