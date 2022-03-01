<template>
      <FormField>
            <label for="age_from"></label>
            <select name="age_from" id="age_from">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
            </select>

            <label for="age_to"></label>
            <select name="age_to" id="age_to">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
            </select>
      </FormField>

      <FormField>
            <BaseInput label="With photo" type="checkbox" name="with_photo" />
      </FormField>
</template>

<script>
import { reactive, watch } from "vue";

import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import RadioOptions from "../forms/RadioOptions.vue";

import validationHandler from "../../mixins/validation";

export default {
      name: "Part2",

      components: {
            FormField,
            BaseInput,
            RadioOptions,
      },

      setup() {
            let part1 = reactive({
                  age: {
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

                  children: null,

                  marital_status: null,
                  smoking: null,
                  drinking: null,
                  relegion: null,
                  eye_color: null,
                  hair_color: null,
            });

            // let rules = { };

            // let { vHandler, isValideForm, formTouch } = validationHandler(
            //       rules,
            //       part1
            // );

            return {
                  part1,
                  // ...vHandler,
            };
      },
};
</script>
