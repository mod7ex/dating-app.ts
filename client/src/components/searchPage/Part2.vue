<template>
      <FormField class="flex">
            <label>Partner age</label>

            <SelectInput
                  label="from"
                  name="age_from"
                  :values="[1, 2, 3]"
                  v-model="part2.partner_age.from"
            />
            <SelectInput
                  label="to"
                  name="age_to"
                  :values="[1, 2, 3]"
                  v-model="part2.partner_age.to"
            />
      </FormField>

      <FormField class="flex">
            <label>Height</label>

            <SelectInput
                  label="from"
                  name="height_from"
                  :values="[1, 2, 3]"
                  v-model="part2.height.from"
            />
            <SelectInput
                  label="to"
                  name="height_to"
                  :values="[1, 2, 3]"
                  v-model="part2.height.to"
            />
      </FormField>

      <FormField class="flex">
            <label>Weight</label>

            <SelectInput
                  label="from"
                  name="weight_from"
                  :values="[1, 2, 3]"
                  v-model="part2.weight.from"
            />
            <SelectInput
                  label="to"
                  name="weight_to"
                  :values="[1, 2, 3]"
                  v-model="part2.weight.to"
            />
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.languages">Languages </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.marital_status"
                  >Marital status
            </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.smoking">Smoking </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.drinking">Drinking </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.relegion">Relegion </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.eye_color">Eye color </CheckboxList>
      </FormField>

      <FormField class="flex">
            <CheckboxList v-model="part2.hair_color">Hair color </CheckboxList>
      </FormField>

      <FormField class="flex">
            <BaseInput
                  type="checkbox"
                  label="Without children"
                  name="without_children"
                  v-model="part2.without_children"
            />
      </FormField>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";

import CheckboxList from "../forms/CheckboxList.vue";
import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";
import SelectInput from "../forms/SelectInput.vue";

export default {
      name: "Part2",

      components: {
            FormField,
            BaseInput,
            SelectInput,
            CheckboxList,
      },

      props: {
            vHandler: Object,
      },

      setup() {
            let store = useStore();
            let part2 = reactive(store.state.app.searchForm);

            return {
                  part2,
            };
      },
};
</script>

<style lang="scss"></style>
