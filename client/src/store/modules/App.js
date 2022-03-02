export default {
      state: () => ({
            showSidebar: false,

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
