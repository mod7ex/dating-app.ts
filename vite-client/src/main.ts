import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import basePlugin from './plugins';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.use(basePlugin);

window.apiLocations = axios.create({
   baseURL: 'http://localhost:4000',
   timeout: 2000,
   headers: {
      // "Content-Type": "application/json",
      Accept: 'application/json',
   },
});

window.api = axios.create({
   baseURL: 'http://localhost:3000/api',
   timeout: 2000,
   headers: {
      // "Content-Type": "application/json",
      Accept: 'application/json',
   },
});

app.mount('#app');
