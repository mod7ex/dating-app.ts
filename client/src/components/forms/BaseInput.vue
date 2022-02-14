<template>
      <label :for="name">{{ label }}</label>
      <input
            :type="type"
            :name="name"
            :id="name"
            class="{{class}}"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('update:value', $event.target.value)"
      />
</template>

<script>
export default {
      name: "BaseInput",

      props: {
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

            class: {
                  type: String,
                  default: "title",
            },

            placeholder: {
                  type: String,
                  default: "Title",
            },

            value: {
                  type: [String, Number],
                  default: "",
            },
      },

      setup() {},
};
</script>
