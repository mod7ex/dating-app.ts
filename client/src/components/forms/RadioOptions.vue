<template>
      <label v-for="option in options" :key="option.value" :for="option.value">
            <input
                  :id="option.value"
                  name="gender"
                  :value="option.value"
                  type="radio"
                  @input="$emit('update:modelValue', option.value)"
            />

            {{ option.label }}
      </label>
</template>

<script>
import { ref } from "vue";

export default {
      name: "RadioOptions",

      props: {
            name: {
                  type: String,
                  default: "field_name",
            },

            options: [Object],

            modelValue: {
                  type: [String, Number, Boolean],
                  default: "",
            },
      },
      emits: ["update:modelValue"],
};
</script>
