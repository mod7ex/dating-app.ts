<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMeStore } from "../../stores/me";
import { useAppStore } from "../../stores/app";
let store = useMeStore();
let appStore = useAppStore();

let form = computed(() => store.meta);

watch(
      () => form.value.location,
      () => {
            appStore.empty_location_options();
      }
);

const loading = ref(false);
let countryOptions = computed(() => appStore.countryOptions);
let stateOptions = computed(() => appStore.stateOptions);
let cityOptions = computed(() => appStore.cityOptions);
let timezoneOptions = computed(() => appStore.timezoneOptions);
let appOptions = computed(() => appStore.appOptions);

let remoteWrapper = (fn: (query: string) => Promise<void>) => {
      return async (qu: string) => {
            loading.value = true;

            await fn(qu);

            setTimeout(() => {
                  loading.value = false;
            }, 200);
      };
};

let fetchCountries = remoteWrapper(appStore.fetch_countries);
let fetchStates = remoteWrapper(appStore.fetch_states);
let fetchCities = remoteWrapper(appStore.fetch_cities);

let saveForm = () => {
      console.log(form.value);
};
</script>

<template>
      <el-form :model="form" label-position="top">
            <div class="input-area">
                  <el-form-item label="Gender">
                        <el-radio-group v-model="form.gender">
                              <el-radio label="none">Not selected</el-radio>
                              <el-radio label="male">Male</el-radio>
                              <el-radio label="female">Female</el-radio>
                        </el-radio-group>
                  </el-form-item>

                  <el-form-item label="Date of birth">
                        <el-date-picker
                              style="width: 100%"
                              v-model="form.dob"
                              type="date"
                              placeholder="Pick a day"
                        />
                  </el-form-item>

                  <el-form-item label="Country">
                        <el-select-v2
                              style="width: 100%"
                              v-model="form.location.country"
                              filterable
                              remote
                              :remote-method="fetchCountries"
                              clearable
                              :options="countryOptions"
                              :loading="loading"
                              placeholder="Search for a country"
                        />
                  </el-form-item>

                  <el-form-item label="State/Region">
                        <el-select-v2
                              style="width: 100%"
                              v-model="form.location.state"
                              filterable
                              remote
                              :remote-method="fetchStates"
                              clearable
                              :options="stateOptions"
                              :loading="loading"
                              placeholder="Search for a state or region"
                        />
                  </el-form-item>

                  <el-form-item label="City">
                        <el-select-v2
                              style="width: 100%"
                              v-model="form.location.city"
                              filterable
                              remote
                              :remote-method="fetchCities"
                              clearable
                              :options="cityOptions"
                              :loading="loading"
                              placeholder="Search for a city"
                        />
                  </el-form-item>

                  <el-form-item label="Timezone">
                        <el-select
                              style="width: 100%"
                              v-model="form.location.timezone"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Choose a timezone"
                        >
                              <el-option
                                    v-for="(item, i) in timezoneOptions"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Phone number">
                        <el-input
                              style="width: 100%"
                              v-model="form.phone_number"
                              placeholder="Phone number"
                              class="input-with-select"
                        >
                              <!-- <template #prepend>
                              <el-select
                                    v-model="select"
                                    placeholder="Select"
                                    style="width: 110px"
                              >
                                    <el-option label="Restaurant" value="1" />
                                    <el-option label="Order No." value="2" />
                                    <el-option label="Tel" value="3" />
                              </el-select>
                        </template> -->
                        </el-input>
                  </el-form-item>

                  <el-form-item label="Marital status">
                        <el-select
                              style="width: 100%"
                              v-model="form.marital_status"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Pick a marital status"
                        >
                              <el-option
                                    v-for="(
                                          item, i
                                    ) in appOptions.maritalStatus"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Height">
                        <el-select
                              style="width: 100%"
                              v-model="form.height"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Your height"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.height"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Weight">
                        <el-select
                              style="width: 100%"
                              v-model="form.weight"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Your weight"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.weight"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Eye color">
                        <el-select
                              style="width: 100%"
                              v-model="form.eye_color"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Your eye color"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.eyeColor"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Hair color">
                        <el-select
                              style="width: 100%"
                              v-model="form.hair_color"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Your hair color"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.hairColor"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Number of children">
                        <el-select
                              style="width: 100%"
                              v-model="form.children"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Number of children"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.children"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Relegion">
                        <el-select
                              style="width: 100%"
                              v-model="form.relegion"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Relegion"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.relegion"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Smoking">
                        <el-select
                              style="width: 100%"
                              v-model="form.smoking"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Smoking"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.habit"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Drinking">
                        <el-select
                              style="width: 100%"
                              v-model="form.drinking"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Drinking"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.habit"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Income">
                        <el-select
                              style="width: 100%"
                              v-model="form.income"
                              filterable
                              default-first-option
                              :reserve-keyword="false"
                              placeholder="Income"
                        >
                              <el-option
                                    v-for="(item, i) in appOptions.income"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                              />
                        </el-select>
                  </el-form-item>

                  <el-form-item label="Ocupation">
                        <el-input
                              style="width: 100%"
                              v-model="form.ocupation"
                              type="text"
                              placeholder="Ocupation"
                        />
                  </el-form-item>

                  <el-form-item label="Education">
                        <el-input
                              style="width: 100%"
                              v-model="form.education"
                              type="text"
                              placeholder="Education"
                        />
                  </el-form-item>

                  <el-form-item label="About me">
                        <el-input
                              style="width: 100%"
                              v-model="form.abount_me"
                              :rows="2"
                              :cols="27"
                              type="textarea"
                              placeholder="About me"
                        />
                  </el-form-item>

                  <el-form-item label="About partner">
                        <el-input
                              style="width: 100%"
                              v-model="form.abount_partner"
                              :rows="2"
                              :cols="27"
                              type="textarea"
                              placeholder="About partner"
                        />
                  </el-form-item>

                  <el-form-item label="Partner age">
                        <div class="slider-demo-block">
                              <el-slider
                                    style="width: 100%"
                                    v-model="form.partner_age"
                                    range
                                    show-stops
                                    :min="appOptions.partner_age_min"
                                    :max="appOptions.partner_age_max"
                              />
                        </div>
                  </el-form-item>
            </div>

            <el-form-item class="submit">
                  <el-button @click="saveForm" type="primary">Save</el-button>
            </el-form-item>
      </el-form>
</template>
