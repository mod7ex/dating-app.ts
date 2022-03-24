export default {
      state: () => ({
            user: null,
            meta: null,

            myLocation: {
                  country: {},
                  state: {},
                  city: {},
            },
      }),

      getters: {
            me_ready(state) {
                  if (!state.user) return false;
                  if (!state.meta) return false;
                  return true;
            },

            myTimezones(state) {
                  if (!state.myLocation.country.timezones) return [];

                  return state.myLocation.country.timezones.map((item, i) => {
                        return {
                              label: `${item.tzName} -- ${item.zoneName} (${item.gmtOffsetName})`,
                              value: i,
                        };
                  });
            },
      },

      mutations: {
            SET_META(state, payload) {
                  state.meta = payload;
            },

            SET_USER(state, payload) {
                  state.user = payload;
            },

            TO_NUMERIC_LOCATION_VALUES(state) {
                  for (let prop of Object.keys(state.meta.location)) {
                        if (!state.meta.location[prop]) continue;
                        state.meta.location[prop] = Number(
                              state.meta.location[prop]
                        );
                  }
            },

            SET_MY_COUNTRY(state, payload) {
                  state.myLocation.country = payload;
            },

            SET_MY_STATE(state, payload) {
                  state.myLocation.state = payload;
            },

            SET_MY_CITY(state, payload) {
                  state.myLocation.city = payload;
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

            numerify_location({ commit }) {
                  commit("TO_NUMERIC_LOCATION_VALUES");
            },

            set_my_country({ commit, rootState }, payload) {
                  if (!payload) return;
                  commit(
                        "SET_MY_COUNTRY",
                        rootState.app.countries.find(
                              (item) => item.id == payload
                        )
                  );
            },

            set_my_state({ commit, rootState }, payload) {
                  if (!payload) return;
                  commit(
                        "SET_MY_STATE",
                        rootState.app.states.find((item) => item.id == payload)
                  );
            },

            set_my_city({ commit, rootState }, payload) {
                  if (!payload) return;
                  commit(
                        "SET_MY_CITY",
                        rootState.app.cities.find((item) => item.id == payload)
                  );
            },

            fetch_my_country({ commit, state }) {
                  if (!state.meta.location.country) return;

                  xhrApiLocations
                        .get(`/countries?id=${state.meta.location.country}`)
                        .then((responce) => {
                              commit("SET_MY_COUNTRY", responce.data[0]);
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

            fetch_my_state({ commit, state }) {
                  if (!state.meta.location.region) return;

                  xhrApiLocations
                        .get(`/states?id=${state.meta.location.region}`)
                        .then((responce) => {
                              commit("SET_MY_STATE", responce.data[0]);
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

            fetch_my_city({ commit, state }) {
                  if (!state.meta.location.city) return;

                  xhrApiLocations
                        .get(`/cities?id=${state.meta.location.city}`)
                        .then((responce) => {
                              commit("SET_MY_CITY", responce.data[0]);
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
