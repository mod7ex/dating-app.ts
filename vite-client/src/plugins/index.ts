import { App } from "vue";
import Auth from "../layouts/Auth.vue";
import Default from "../layouts/Default.vue";
import Tabs from "../components/Tabs.vue";

export default {
      install: (app: App, options) => {
            app.component("Auth", Auth);
            app.component("Default", Default);
            app.component("Tabs", Tabs);
      },
};
