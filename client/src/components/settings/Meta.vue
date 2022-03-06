<template>
      <div class="user-meta userForm user-fields">
            <FormField id="gender" class="flex">
                  <label>Gender:</label>
                  <div class="options">
                        <RadioOptions
                              :options="options"
                              v-model="meta.gender"
                              name="gender"
                        />
                  </div>
            </FormField>

            <FormField>
                  <BaseInput
                        type="date"
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
                        v-model="meta.location.country"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Region"
                        name="region"
                        v-model="meta.location.region"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="City"
                        name="city"
                        v-model="meta.location.city"
                  />
            </FormField>

            <FormField>
                  <SelectInput
                        label="Timezone"
                        name="timezone"
                        :values="[1, 2, 3]"
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
      </div>
</template>

<script>
import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import SelectInput from "../forms/SelectInput.vue";
import RadioOptions from "../forms/RadioOptions.vue";

import { useStore } from "vuex";
import { reactive } from "vue";

import validationHandler from "../../mixins/validation";
import { phone_number } from "../../helpers/validators";
export default {
      name: "Meta",

      components: {
            FormField,
            BaseInput,
            RadioOptions,
            SelectInput,
      },

      setup() {
            let store = useStore();

            let meta = reactive(store.state.me.meta);

            let options = reactive(store.state.app.genderOptions);

            let rules = {
                  phone_number: { phone_number },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  meta
            );

            return {
                  meta,
                  options,
                  ...vHandler,
            };
      },
};
</script>

<style lang="scss">
.user-meta {
      .form-field {
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
      }
}
</style>
