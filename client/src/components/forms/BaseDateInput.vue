<template>
      <label :for="name">
            {{ label }}
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>
      <input :id="name" type="date" v-model="value" @input="foo()" />
</template>

<script>
import { onMounted, ref } from "vue";

export default {
      name: "BaseDateInput",

      props: {
            mandatory: {
                  type: Boolean,
                  default: false,
            },

            label: {
                  type: String,
                  default: "Title",
            },

            name: {
                  type: String,
                  default: "title",
            },

            modelValue: {
                  type: String,
                  default: "",
            },
      },

      emits: ["update:modelValue"],

      setup(props, { emit }) {
            let value = ref(null);

            let foo = () => {
                  emit("update:modelValue", value.value);
            };

            onMounted(() => {
                  value.value = props.modelValue.split("T")[0];
            });

            return {
                  value,
                  foo,
            };
      },
};
</script>
