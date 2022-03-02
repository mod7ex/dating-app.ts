<template>
      <label>
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>

      <div class="checkbox-list">
            <span class="choice" v-for="val in values" :key="val.value">
                  <label :for="`option-${val.value}`">
                        {{ val.label }}
                  </label>
                  <input
                        :id="`option-${val.value}`"
                        type="checkbox"
                        v-model="optionsList"
                        :value="val.value"
                        @change="foo()"
                  />
            </span>
      </div>
</template>

<script>
import { ref } from "vue";

export default {
      name: "CheckboxList",

      props: {
            mandatory: {
                  type: Boolean,
                  default: false,
            },

            values: {
                  type: Array,
                  default: [
                        { label: "Value 1", value: 1 },
                        { label: "Value 2", value: 2 },
                        { label: "Value 3", value: 3 },
                  ],
            },

            modelValue: {
                  type: Array,
                  default: [],
            },
      },
      emits: ["update:modelValue"],

      setup(_, { emit }) {
            let optionsList = ref([]);

            let foo = () => {
                  emit("update:modelValue", optionsList.value);
            };

            return {
                  optionsList,
                  foo,
            };
      },
};
</script>

<style lang="scss">
.checkbox-list {
      width: 100%;
      @include flex($wrap: wrap, $justify: flex-start);

      .choice {
            margin-right: 1.5em;
            @include flex();
            label {
                  margin-right: 0.3em;
            }
      }
}
</style>
