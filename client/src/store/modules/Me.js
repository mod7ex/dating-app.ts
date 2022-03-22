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

            fetch_me({ dispatch }) {
                  xhrApi.get("/user/me")
                        .then((responce) => {
                              let { user, meta } = responce.data;
                              dispatch("set_meta", meta);
                              dispatch("set_user", user);
                        })
                        .catch((error) => {
                              if (error.response) {
                                    console.log(error.response.data);
                              } else if (error.request) {
                                    console.log(error.request);
                              } else {
                                    console.log("Error", error.message);
                              }
                        });
            },
      },
};
