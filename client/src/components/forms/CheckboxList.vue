<template>
      <label>
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>

      <div class="checkbox-list">
            <span class="choice" v-for="val in values" :key="val.value">
                  <label :for="name(val)">
                        {{ val.label }}
                  </label>
                  <input
                        :checked="optionsList.includes(val.value)"
                        :id="name(val)"
                        type="checkbox"
                        v-model="optionsList"
                        :value="val.value"
                        @change="foo()"
                  />
            </span>
      </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
      name: "CheckboxList",

      props: {
            mandatory: {
                  type: Boolean,
                  default: false,
            },

            values: {
                  type: Array,
                  default: [{ label: "Value 1", value: 1 }],
            },

            modelValue: {
                  type: Array,
                  default: [],
            },
      },
      emits: ["update:modelValue"],

      setup(props, { emit }) {
            let optionsList = ref([]);

            onMounted(() => {
                  optionsList.value = props.modelValue;
            });

            let foo = () => {
                  emit("update:modelValue", optionsList.value);
            };

            let name = (obj) => {
                  return `${obj.value}-${obj.label.replace(" ", "-")}`;
            };

            return {
                  optionsList,
                  foo,
                  name,
            };
      },
};
</script>

<style lang="scss">
.checkbox-list {
      width: 100% !important;
      @include flex($wrap: wrap, $justify: flex-start);

      .choice {
            margin-right: 1.5em;
            margin-bottom: 1em;
            @include flex();
            label {
                  margin-right: 0.3em;
            }
      }
}
</style>
