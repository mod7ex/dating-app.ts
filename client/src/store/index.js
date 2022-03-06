import { createStore } from "vuex";

import App from "./modules/App";
import Me from "./modules/Me";

export default createStore({
      state: {},

      mutations: {},

      actions: {},

      modules: {
            app: App,
            me: Me,
      },
});
