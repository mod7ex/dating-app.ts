<template>
      <FormField id="gender" class="flex">
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

      <FormField
            :valide="vHandler.username.valide"
            :error="vHandler.username.error"
      >
            <BaseInput
                  type="text"
                  label="Username"
                  name="username"
                  v-model="part1.username"
            />
      </FormField>

      <FormField :valide="vHandler.name.valide" :error="vHandler.name.error">
            <BaseInput
                  type="text"
                  label="Name"
                  name="name"
                  v-model="part1.name"
            />
      </FormField>

      <FormField
            :valide="vHandler.phone_number.valide"
            :error="vHandler.phone_number.error"
      >
            <BaseInput
                  label="Phone number"
                  type="text"
                  name="phone_number"
                  v-model="part1.phone_number"
            />
      </FormField>

      <FormField id="online_now" class="flex">
            <BaseInput
                  label="Online now"
                  type="checkbox"
                  name="online"
                  v-model="part1.online"
            />
      </FormField>

      <FormField id="withPhoto" class="flex">
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
import { useStore } from "vuex";

import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import RadioOptions from "../forms/RadioOptions.vue";

// import validationHandler from "../../mixins/validation";

// import { name, phone_number } from "../../helpers/validators";

export default {
      name: "Part1",

      components: {
            FormField,
            BaseInput,
            RadioOptions,
      },

      props: {
            vHandler: Object,
      },

      setup() {
            let store = useStore();

            let part1 = reactive(store.state.app.searchForm);

            let options = reactive(store.state.app.genderOptions);

            // let options = [
            //       { label: "Male", value: "male" },
            //       { label: "Female", value: "female" },
            //       { label: "Any", value: "any" },
            // ];

            return {
                  part1,
                  options,
            };
      },
};
</script>

<style lang="scss">
.location {
      padding: 1.3em 1.3em 0.7em 1.3em;
      margin-bottom: 1.3em;
      @include shadow($blure: 11px, $spread: 1px, $inset: true);
      border-radius: $border-radius;
}
</style>
