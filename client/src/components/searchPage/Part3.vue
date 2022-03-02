<template>
      <FormField>
            <BaseInput
                  label="Education"
                  type="text"
                  name="education"
                  v-model="part3.education"
            />
      </FormField>

      <FormField>
            <BaseInput
                  label="Ocupation"
                  type="text"
                  name="ocupation"
                  v-model="part3.ocupation"
            />
      </FormField>

      <FormField class="flex">
            <label>Income</label>

            <SelectInput
                  label=" "
                  name="age_from"
                  :values="[1, 2, 3]"
                  v-model="part3.income"
            />
      </FormField>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";

import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import SelectInput from "../forms/SelectInput.vue";

export default {
      name: "Part3",

      components: {
            FormField,
            BaseInput,
            SelectInput,
      },

      props: {
            vHandler: Object,
      },

      setup() {
            let store = useStore();
            let part3 = reactive(store.state.app.searchForm);

            return {
                  part3,
            };
      },
};
</script>

<style lang="scss"></style>
