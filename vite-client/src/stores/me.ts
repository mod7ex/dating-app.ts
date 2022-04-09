import { defineStore } from "pinia";

export const useMeStore = defineStore("me", {
      state: () => ({
            user: {},
            meta: {
                  location: {
                        country: "" as string | number,
                        state: "" as string | number,
                        city: "" as string | number,
                        timezone: "" as string | number,
                  },
            },
      }),

      getters: {},

      actions: {},
});
