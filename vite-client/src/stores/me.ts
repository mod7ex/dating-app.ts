import { defineStore } from "pinia";

export const useMeStore = defineStore("me", {
      state: () => ({
            user: {},
            meta: {
                  location: {
                        country: "",
                        state: "",
                        city: "",
                  },
            },
      }),

      getters: {},

      actions: {},
});
