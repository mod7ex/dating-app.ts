<template>
      <label :for="name">
            {{ label }}
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>
      <input
            :id="name"
            :type="type"
            :value="modelValue"
            :placeholder="label"
            autocomplete="off"
            v-model="value"
            @input="foo()"
      />
</template>

<script>
import { ref } from "vue";

export default {
      name: "BaseInput",

      props: {
            type: {
                  type: String,
                  default: "text",
            },

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
                  type: [String, Number, Boolean],
                  default: "",
            },
      },
      emits: ["update:modelValue"],

      setup(props, { emit }) {
            let value = ref(null);

            if (props.type == "checkbox") value.value = false;

            let foo = () => {
                  let payload = value.value;

                  if (props.type == "checkbox") payload = !payload;

                  emit("update:modelValue", payload);
            };

            return {
                  value,
                  foo,
            };
      },
};
</script>

<style lang="scss" scoped>
label {
      max-width: fit-content;
}
</style>
