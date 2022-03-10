<template>
      <label :for="name"
            >{{ label }}
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>

      <textarea
            name=""
            id=""
            rows="5"
            @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
</template>

<script>
export default {
      name: "TextArea",

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
                  type: [String, Number, Boolean],
                  default: "",
            },
      },

      emits: ["update:modelValue"],
};
</script>
