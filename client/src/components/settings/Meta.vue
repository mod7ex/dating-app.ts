<template>
      <div class="user-meta userForm user-fields">
            <FormField id="gender" class="flex">
                  <label>Gender:</label>
                  <div class="options">
                        <RadioOptions
                              :options="appOptions.gender"
                              v-model="meta.gender"
                              name="gender"
                        />
                  </div>
            </FormField>

            <FormField>
                  <BaseDateInput
                        label="Date of birth"
                        name="dob"
                        v-model="meta.dob"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Country"
                        name="country"
                        v-model="location.country.name"
                  />
                  <OptionsListing
                        v-model="meta.location.country"
                        :options="storeLocation.countries"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Region"
                        name="region"
                        v-model="location.state.name"
                  />
                  <OptionsListing
                        v-model="meta.location.state"
                        :options="storeLocation.states"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="City"
                        name="city"
                        v-model="location.city.name"
                  />
                  <OptionsListing
                        v-model="meta.location.city"
                        :options="storeLocation.cities"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Timezone"
                        name="timezone"
                        :items="[{ label: 'Casa gmt', value: 2 }]"
                        v-model="meta.location.timezone"
                  />
            </FormField>

            <FormField
                  :valide="phone_number.valide"
                  :error="phone_number.error"
            >
                  <BaseInput
                        label="Phone number"
                        type="text"
                        name="phone_number"
                        v-model="meta.phone_number"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Marital Status"
                        name="marital_status"
                        :items="appOptions.maritalStatus"
                        v-model="meta.marital_status"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Height"
                        name="height"
                        :items="appOptions.height"
                        v-model="meta.height"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Weight"
                        name="weight"
                        :items="appOptions.weight"
                        v-model="meta.weight"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Eye color"
                        name="eye_color"
                        :items="appOptions.eyeColor"
                        v-model="meta.eye_color"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Hair color"
                        name="hair_color"
                        :items="appOptions.hairColor"
                        v-model="meta.hair_color"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Number of children"
                        name="children"
                        :items="appOptions.children"
                        v-model="meta.children"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Relegion"
                        name="relegion"
                        :items="appOptions.relegion"
                        v-model="meta.relegion"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Smoking"
                        name="smoking"
                        :items="appOptions.habit"
                        v-model="meta.smoking"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Drinking"
                        name="drinking"
                        :items="appOptions.habit"
                        v-model="meta.drinking"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Income"
                        name="income"
                        :items="appOptions.income"
                        v-model="meta.income"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Education"
                        name="education"
                        v-model="meta.education"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Ocupation"
                        name="ocupation"
                        v-model="meta.ocupation"
                  />
            </FormField>

            <FormField class="flex checkbox-list languages">
                  <CheckboxList
                        v-model="meta.languages"
                        :values="appOptions.languages"
                        >Languages
                  </CheckboxList>
            </FormField>

            <FormField>
                  <TextArea
                        v-model="meta.about_me"
                        name="about_me"
                        label="About me"
                  />
            </FormField>

            <FormField>
                  <TextArea
                        v-model="meta.about_partner"
                        name="about_partner"
                        label="About partner"
                  />
            </FormField>

            <FormField class="flex partner-age" v-if="meta.partner_age">
                  <label>Partner age</label>

                  <SelectInput
                        label="from"
                        name="partner_age_from"
                        :items="appOptions.partnerAge"
                        v-model="meta.partner_age.from"
                  />
                  <SelectInput
                        label="to"
                        name="partner_age_to"
                        :items="appOptions.partnerAge"
                        v-model="meta.partner_age.to"
                  />
            </FormField>
      </div>
</template>

<script>
import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import SelectInput from "../forms/SelectInput.vue";
import RadioOptions from "../forms/RadioOptions.vue";
import CheckboxList from "../forms/CheckboxList.vue";
import BaseDateInput from "../forms/BaseDateInput.vue";
import TextArea from "../forms/TextArea.vue";
import OptionsListing from "../forms/OptionsListing.vue";

import { useStore } from "vuex";
import { watch, computed, reactive } from "vue";

import validationHandler from "../../mixins/validation";
import { phone_number } from "../../helpers/validators";
export default {
      name: "Meta",

      components: {
            FormField,
            BaseInput,
            RadioOptions,
            SelectInput,
            CheckboxList,
            TextArea,
            BaseDateInput,
            OptionsListing,
      },

      setup() {
            let store = useStore();

            let meta = computed(() => store.state.me.meta);
            let storeLocation = computed(() => store.getters.storeLocation);

            let appOptions = store.getters.appOptions;

            let rules = {
                  phone_number: { phone_number },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  meta
            );

            let location = reactive({
                  country: {},
                  state: {},
                  city: {},
            });

            let meta = computed(() => store.state.me.meta);

            watch(
                  () => location.country.name,
                  (v) => {
                        store.dispatch("fetch_countries", v);
                  }
            );

            watch(
                  () => location.state.name,
                  (v) => {
                        store.dispatch("fetch_states", {
                              v,
                              country_code: location.country.code,
                        });
                  }
            );

            watch(
                  () => location.city.name,
                  (v) => {
                        store.dispatch("fetch_cities", {
                              v,
                              state_code: location.state.code,
                              country_code: location.country.code,
                        });
                  }
            );

            watch(
                  () => meta.value.location.country,
                  (v) => {
                        location.country = storeLocation.value.countries.find(
                              (item) => item.id == v
                        );

                        setTimeout(async () => {
                              await store.dispatch("empty_location");
                        }, 300);
                  }
            );

            watch(
                  () => meta.value.location.state,
                  (v) => {
                        location.state = storeLocation.value.states.find(
                              (item) => item.id == v
                        );

                        setTimeout(async () => {
                              await store.dispatch("empty_location");
                        }, 300);
                  }
            );

            watch(
                  () => meta.value.location.city,
                  (v) => {
                        location.city = storeLocation.value.cities.find(
                              (item) => item.id == v
                        );

                        setTimeout(async () => {
                              await store.dispatch("empty_location");
                        }, 300);
                  }
            );

            return {
                  appOptions,
                  ...vHandler,
                  meta,
                  location,
                  storeLocation,
            };
      },
};
</script>

<style lang="scss">
.user-meta {
      .form-field {
            position: relative;
            .select-input {
                  margin-right: 0 !important;
                  flex-direction: column !important;
                  align-items: flex-start;

                  select {
                        padding: 1em;
                        border: 1px solid transparent;
                        display: block !important;
                        width: 100%;
                        border-radius: $border-radius;
                        @include shadow($blure: 3px);
                        margin-top: 0.3em;

                        &:hover {
                              @include shadow();
                        }

                        &:focus {
                              @include shadow();
                              border-color: rgba($black, 0.3);
                        }
                  }
            }

            &.partner-age {
                  .select-input {
                        margin-right: 2em !important;
                        max-width: 15em !important;
                        width: 100%;
                        flex-direction: row !important;
                        align-items: center !important;

                        select {
                              flex-grow: 1 !important;
                        }
                  }
            }

            &.checkbox-list {
                  .error {
                        display: none;
                  }
            }

            &.languages {
                  align-items: flex-start !important;
            }

            textarea {
                  resize: none;
            }
      }
}
</style>
