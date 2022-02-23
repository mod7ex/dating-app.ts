import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let app = createApp(App);

app.use(store);
app.use(router);

// app.directive("clickOutside", (el, binding) => {
//       document.addEventListener("click", function (e) {
//             if (el.contains(e.target)) return;
//             binding.value();
//       });
// });

app.mount("#app");
