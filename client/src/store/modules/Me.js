export default {
      state: () => ({
            user: null,
            meta: null,
      }),

      getters: {
            me_ready(state) {
                  if (!state.user) return false;
                  if (!state.meta) return false;
                  return true;
            },
      },

      mutations: {
            SET_META(state, payload) {
                  state.meta = payload;
            },

            SET_USER(state, payload) {
                  state.user = payload;
            },
      },

      actions: {
            set_meta({ commit }, payload) {
                  commit("SET_META", payload);
            },

            set_user({ commit }, payload) {
                  commit("SET_USER", payload);
            },
      },
};
