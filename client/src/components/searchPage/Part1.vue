<template>
      <FormField id="gender">
            <label>Gender:</label>
            <div class="options">
                  <RadioOptions
                        :options="options"
                        v-model="part1.gender"
                        name="gender"
                  />
            </div>
      </FormField>

      <div class="location">
            <FormField>
                  <BaseInput
                        type="text"
                        label="Country"
                        name="country"
                        v-model="part1.location.country"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="Region"
                        name="region"
                        v-model="part1.location.region"
                  />
            </FormField>

            <FormField>
                  <BaseInput
                        type="text"
                        label="City"
                        name="city"
                        v-model="part1.location.city"
                  />
            </FormField>
      </div>

      <FormField :valide="username.valide" :error="username.error">
            <BaseInput
                  type="text"
                  label="Username"
                  name="username"
                  v-model="part1.username"
            />
      </FormField>

      <FormField :valide="name.valide" :error="name.error">
            <BaseInput
                  type="text"
                  label="Name"
                  name="name"
                  v-model="part1.name"
            />
      </FormField>

      <FormField :valide="phone_number.valide" :error="phone_number.error">
            <BaseInput
                  label="Phone number"
                  type="text"
                  name="phone_number"
                  v-model="part1.phone_number"
            />
      </FormField>

      <FormField id="online_now">
            <BaseInput
                  label="Online now"
                  type="checkbox"
                  name="online"
                  v-model="part1.online"
            />
      </FormField>

      <FormField id="withPhoto">
            <BaseInput
                  label="With photo"
                  type="checkbox"
                  name="with_photo"
                  v-model="part1.with_photo"
            />
      </FormField>
</template>

<script>
import { reactive, watch } from "vue";

import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import RadioOptions from "../forms/RadioOptions.vue";

import validationHandler from "../../mixins/validation";

import { name, phone_number } from "../../helpers/validators";

export default {
      name: "Part1",

      components: {
            FormField,
            BaseInput,
            RadioOptions,
      },

      setup() {
            let part1 = reactive({
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
            });

            let rules = {
                  username: { name },
                  name: { name },
                  phone_number: { phone_number },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  part1
            );

            let options = [
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Any", value: "any" },
            ];

            return {
                  part1,
                  options,
                  ...vHandler,
            };
      },
};
</script>

<style lang="scss">
#gender {
      @include flex($justify: flex-start);

      label {
            margin-right: 1em;
      }

      .options {
            @include flex($justify: flex-start);

            label {
                  margin-right: 1em;
                  @include flex();
                  input {
                        margin-right: 0.3em;
                  }
            }
      }
}

#online_now,
#withPhoto {
      @include flex($justify: flex-start);
      label {
            min-width: 6em;
      }
}

.location {
      padding: 1.3em 1.3em 0.7em 1.3em;
      margin-bottom: 1.3em;
      @include shadow($blure: 11px, $spread: 1px, $inset: true);
      border-radius: $border-radius;
}
</style>
