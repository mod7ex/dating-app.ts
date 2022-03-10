export default {
      state: () => ({
            showSidebar: false,

            appOptions: {
                  gender: [
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Any", value: "any" },
                  ],

                  maritalStatus: [
                        { label: "Single", value: "single" },
                        { label: "Married", value: "married" },
                        { label: "Complicated", value: "complicated" },
                  ],

                  timezone: [
                        { label: "Casablanca GMT", value: 1 },
                        { label: "Paris GMT", value: 2 },
                        { label: "Newyork GMT", value: 3 },
                  ],

                  height: [1, 2, 3, 4, 5].map((i) => {
                        return { label: i * 23, value: i };
                  }),

                  weight: [1, 2, 3, 4, 5].map((i) => {
                        return { label: i * 23, value: i };
                  }),

                  eyeColor: [1, 2, 3, 4, 5].map((i) => {
                        return { label: i * 23, value: i };
                  }),

                  hairColor: [1, 2, 3, 4, 5].map((i) => {
                        return { label: i * 23, value: i };
                  }),

                  children: [1, 2, 3, 4].map((i) => {
                        return { label: `${i > 3 ? "more" : i}`, value: i };
                  }),

                  relegion: [1, 2, 3, 4].map((i) => {
                        return { label: i, value: i };
                  }),

                  habit: [1, 2, 3, 4].map((i) => {
                        return { label: i, value: i };
                  }),

                  income: [1, 2, 3, 4].map((i) => {
                        return { label: i, value: i };
                  }),

                  partnerAge: [1, 2, 3, 4].map((i) => {
                        return { label: i, value: i };
                  }),

                  language: [
                        { value: 1, label: "Russian" },
                        { value: 2, label: "Arabic" },
                        { value: 3, label: "English" },
                        { value: 4, label: "French" },
                        { value: 5, label: "German" },
                        { value: 6, label: "Chinese" },
                  ],
            },

            searchForm: {
                  // part 1
                  gender: null,
                  location: {
                        country: null,
                        region: null,
                        city: null,
                  },
                  username: null,
                  name: null,
                  online: false,
                  phone_number: null,
                  with_photo: false,

                  // part 2
                  partner_age: {
                        from: null,
                        to: null,
                  },
                  height: {
                        from: null,
                        to: null,
                  },
                  weight: {
                        from: null,
                        to: null,
                  },
                  without_children: false,
                  languages: [],
                  marital_status: [],
                  smoking: [],
                  drinking: [],
                  relegion: [],
                  eye_color: [],
                  hair_color: [],

                  // part3
                  income: null,
                  education: null,
                  ocupation: null,
            },
      }),

      mutations: {
            SWITCH_SIDEBAR(state) {
                  state.showSidebar = !state.showSidebar;
            },

            CLOSE_SIDEBAR(state) {
                  state.showSidebar = false;
            },
      },

      actions: {
            switchSidebar({ commit }) {
                  commit("SWITCH_SIDEBAR");
            },

            closeSidebar({ commit }) {
                  commit("CLOSE_SIDEBAR");
            },
      },

      getters: {
            showSidebar(state) {
                  return state.showSidebar;
            },
      },
};
