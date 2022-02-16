<template>
      <label :for="name">
            {{ label }}
            <slot></slot>
            <span v-if="mandatory" class="mandatory"></span>
      </label>
      <input
            :type="type"
            :id="name"
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :autocomplete="autocomplete"
      />
</template>

<script>
export default {
      name: "BaseInput",

      props: {
            autocomplete: {
                  type: String,
                  default: "off",
            },

            mandatory: {
                  type: Boolean,
                  default: false,
            },

            label: {
                  type: String,
                  default: "Title",
            },

            type: {
                  type: String,
                  default: "text",
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

      setup() {},
};
</script>
