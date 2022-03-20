export default {
      state: () => ({
            accessToken: null,
            refreshToken: null,
      }),

      getters: {
            access(state) {
                  return state.accessToken;
            },

            refresh(state) {
                  return state.refreshToken;
            },
      },

      mutations: {
            SET_ACCESS_TOKEN(state, payload) {
                  state.accessToken = payload;
            },

            SET_REFRESH_TOKEN(state, payload) {
                  state.refreshToken = payload;
            },
      },

      actions: {
            set_access_token({ commit }, payload) {
                  commit("SET_ACCESS_TOKEN", payload);
            },

            set_refresh_token({ commit }, payload) {
                  commit("SET_REFRESH_TOKEN", payload);
            },

            store_access_token({ getters }) {
                  if (!getters.access) return;
                  localStorage.setItem("accessToken", getters.access);
            },

            store_refresh_token({ getters }) {
                  if (!getters.refresh) return;
                  localStorage.setItem("refreshToken", getters.refresh);
            },

            pullUp_access_token({ dispatch }) {
                  dispatch(
                        "set_access_token",
                        localStorage.getItem("accessToken")
                  );
            },

            pullUp_refresh_token({ dispatch }) {
                  dispatch(
                        "set_refresh_token",
                        localStorage.getItem("refreshToken")
                  );
            },
      },
};
