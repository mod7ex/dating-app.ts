export default {
      state: () => ({
            showSidebar: false,

            data: {
                  // weights,
                  min_weight: 5, // weight in pounds
                  max_weight: 1000, // weight in pounds

                  // heights,
                  min_height: 55, // height in cm
                  max_height: 280, // height in cm

                  children_max: 3,

                  min_age: 18,
                  max_age: 70,

                  genders: ["Male", "Female", "Other"],

                  habit: ["No", "Rarely", "Often", "Very often"],

                  income: ["Low", "Medium", "Height"],

                  marital_status: [
                        "single",
                        "divorced",
                        "separated",
                        "widowed",
                  ],

                  hair_colors: [
                        "Auburn",
                        "Bald",
                        "Black",
                        "Blonde",
                        "Brown",
                        "Brunette",
                        "Charcoal",
                        "Chestnut",
                        "Golden",
                        "Gray",
                        "Red",
                        "Silver",
                        "White",
                  ],

                  eye_colors: [
                        "Black",
                        "Brown",
                        "Blue",
                        "Gray",
                        "Green",
                        "Hazel",
                  ],

                  relegions: [
                        "Non-believer",
                        "Muslim",
                        "Agnostic",
                        "Another",
                        "Baptist",
                        "Buddhist",
                        "Catholic",
                        "Christian",
                        "Jewish",
                  ],

                  languages: [
                        "Arabic",
                        "English",
                        "Japanese",
                        "German",
                        "Turkish",
                        "French",
                        "Russian",
                        "Italian",
                        "Greek",
                        "Spanish",
                        "Dutch",
                        "Portuguese",
                        "Polish",
                        "Chinese",
                        "Romanian",
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

            countries: [],
            states: [],
            cities: [],
      }),

      getters: {
            showSidebar(state) {
                  return state.showSidebar;
            },

            appOptions(state) {
                  return {
                        gender: state.data.genders.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        maritalStatus: state.data.marital_status.map(
                              (item, i) => {
                                    return { label: item, value: i };
                              }
                        ),

                        weight: Array.from(
                              Array(
                                    state.data.max_weight -
                                          state.data.min_weight +
                                          1
                              ).keys()
                        ).map((i) => {
                              return {
                                    label: `${i + state.data.min_weight} pd (${(
                                          (i + state.data.min_weight) *
                                          0.453592
                                    ).toFixed(2)} kg)`,
                                    value: i + state.data.min_weight,
                              };
                        }),

                        height: Array.from(
                              Array(
                                    state.data.max_height -
                                          state.data.min_height +
                                          1
                              ).keys()
                        ).map((i) => {
                              return {
                                    label: `${i + state.data.min_height} cm (${(
                                          (i + state.data.min_height) *
                                          0.01
                                    ).toFixed(2)} m)`,
                                    value: i + state.data.min_height,
                              };
                        }),

                        eyeColor: state.data.eye_colors.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        hairColor: state.data.hair_colors.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        children: Array.from(
                              Array(state.data.children_max + 1).keys()
                        ).map((i) => {
                              return { label: i, value: i };
                        }),

                        relegion: state.data.relegions.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        habit: state.data.habit.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        income: state.data.income.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        partnerAge: Array.from(
                              Array(
                                    state.data.max_age - state.data.min_age + 1
                              ).keys()
                        ).map((i) => {
                              return {
                                    label: `${i + state.data.min_age} years`,
                                    value: i + state.data.min_age,
                              };
                        }),

                        languages: state.data.languages.map((item, i) => {
                              return { label: item, value: i };
                        }),
                  };
            },

            storeLocation(state) {
                  return {
                        countries: state.countries,
                        states: state.states,
                        cities: state.cities,
                  };
            },
      },

      mutations: {
            SWITCH_SIDEBAR(state) {
                  state.showSidebar = !state.showSidebar;
            },

            CLOSE_SIDEBAR(state) {
                  state.showSidebar = false;
            },

            SET_COUNTRIES(state, payload) {
                  state.countries = payload;
            },

            SET_STATES(state, payload) {
                  state.states = payload;
            },

            SET_CITIES(state, payload) {
                  state.cities = payload;
            },
      },

      actions: {
            switchSidebar({ commit }) {
                  commit("SWITCH_SIDEBAR");
            },

            closeSidebar({ commit }) {
                  commit("CLOSE_SIDEBAR");
            },

            empty_location({ commit }) {
                  commit("SET_COUNTRIES", []);
                  commit("SET_STATES", []);
                  commit("SET_CITIES", []);
            },

            fetch_countries({ commit }, payload) {
                  if (!payload) return commit("SET_COUNTRIES", []);

                  xhrApiLocations
                        .get(`/countries?name_like=${payload}`)
                        .then((responce) => {
                              commit("SET_COUNTRIES", responce.data);
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

            fetch_states({ commit }, payload) {
                  if (!payload.v) return commit("SET_STATES", []);

                  xhrApiLocations
                        .get(
                              `/states?name_like=${payload.v}&country_code=${payload.country_code}`
                        )
                        .then((responce) => {
                              commit("SET_STATES", responce.data);
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

            fetch_cities({ commit }, payload) {
                  if (!payload) return commit("SET_CITIES", []);

                  xhrApiLocations
                        .get(
                              `/cities?name_like=${payload.v}&country_code=${payload.country_code}&state_code=${payload.state_code}`
                        )
                        .then((responce) => {
                              commit("SET_CITIES", responce.data);
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
