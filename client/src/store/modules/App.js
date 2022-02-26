export default {
      state: () => ({
            showSidebar: false,
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
