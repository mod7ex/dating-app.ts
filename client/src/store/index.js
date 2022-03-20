import { createStore } from "vuex";

import App from "./modules/App";
import Me from "./modules/Me";
import Tokens from "./modules/Tokens";

export default createStore({
      state: {},

      mutations: {},

      actions: {},

      modules: {
            app: App,
            me: Me,
            tokens: Tokens,
      },
});
