import { defineStore } from "pinia";
import { get } from "../helpers/requests";
import { useMeStore } from "./me";

let meStore = useMeStore();

export const useAppStore = defineStore("app", {
      state: () => ({
            base_data: {
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
                        "Single",
                        "Divorced",
                        "Separated",
                        "Widowed",
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

            countries: [] as countryType[],
            states: [] as stateType[],
            cities: [] as cityType[],
            timezones: [{ id: 1, name: "GMT+" }] as cityType[],
      }),

      getters: {
            appOptions(state) {
                  return {
                        gender: state.base_data.genders.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        maritalStatus: state.base_data.marital_status.map(
                              (item, i) => {
                                    return { label: item, value: i };
                              }
                        ),

                        weight: Array.from(
                              Array(
                                    state.base_data.max_weight -
                                          state.base_data.min_weight +
                                          1
                              ).keys()
                        ).map((i) => {
                              return {
                                    label: `${
                                          i + state.base_data.min_weight
                                    } pd (${(
                                          (i + state.base_data.min_weight) *
                                          0.453592
                                    ).toFixed(2)} kg)`,
                                    value: i + state.base_data.min_weight,
                              };
                        }),

                        height: Array.from(
                              Array(
                                    state.base_data.max_height -
                                          state.base_data.min_height +
                                          1
                              ).keys()
                        ).map((i) => {
                              return {
                                    label: `${
                                          i + state.base_data.min_height
                                    } cm (${(
                                          (i + state.base_data.min_height) *
                                          0.01
                                    ).toFixed(2)} m)`,
                                    value: i + state.base_data.min_height,
                              };
                        }),

                        eyeColor: state.base_data.eye_colors.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        hairColor: state.base_data.hair_colors.map(
                              (item, i) => {
                                    return { label: item, value: i };
                              }
                        ),

                        children: Array.from(
                              Array(state.base_data.children_max + 1).keys()
                        ).map((i) => {
                              return { label: i, value: i };
                        }),

                        relegion: state.base_data.relegions.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        habit: state.base_data.habit.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        income: state.base_data.income.map((item, i) => {
                              return { label: item, value: i };
                        }),

                        partner_age_max: state.base_data.max_age,
                        partner_age_min: state.base_data.min_age,

                        languages: state.base_data.languages.map((item, i) => {
                              return { label: item, value: i };
                        }),
                  };
            },

            countryOptions(state) {
                  return state.countries.map((country) => ({
                        value: country.id,
                        label: country.name,
                  }));
            },
            stateOptions(state) {
                  return state.states.map((state) => ({
                        value: state.id,
                        label: state.name,
                  }));
            },
            cityOptions(state) {
                  return state.cities.map((city) => ({
                        value: city.id,
                        label: city.name,
                  }));
            },
            timezoneOptions(state) {
                  return state.timezones.map((tz) => ({
                        value: tz.id,
                        label: tz.name,
                  }));
            },
      },

      actions: {
            empty_location_options() {
                  this.countries = [];
                  this.states = [];
                  this.cities = [];
            },

            async fetch_countries(query: string) {
                  if (!query) return;

                  this.countries = await get<any[]>(
                        `/countries?name_like=${query}`
                  );
            },

            async fetch_states(query: string) {
                  if (!meStore.meta.location.country || !query) return;

                  this.countries = await get<any[]>(
                        `/states?name_like=${query}&country_id=${meStore.meta.location.country}`
                  );
            },

            async fetch_cities(query: string) {
                  if (
                        !meStore.meta.location.country ||
                        !meStore.meta.location.state ||
                        !query
                  )
                        return;

                  this.countries = await get<any[]>(
                        `/cities?name_like=${query}&country_id=${meStore.meta.location.country}&state_id=${meStore.meta.location.state}`
                  );
            },
      },
});
