import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SocketIO from "./plugins/socket";

window.xhrApi = axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 2000,
      headers: {
            // "Content-Type": "application/json",
            Accept: "application/json",
      },
});

xhrApi.interceptors.request.use(
      function (config) {
            config.headers = {
                  ...config.headers,
                  Authorization: `Bearer ${store.getters.access}`,
                  "X-REFRESH": store.getters.refresh,
            };

            return config;
      },
      function (error) {
            return Promise.reject(error);
      }
);

let app = createApp(App);

app.use(SocketIO);

app.use(store);
app.use(router);

// app.directive("clickOutside", (el, binding) => {
//       document.addEventListener("click", function (e) {
//             if (el.contains(e.target)) return;
//             binding.value();
//       });
// });

app.mount("#app");
