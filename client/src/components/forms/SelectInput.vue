<template>
      <div class="select-input">
            <label :for="name">{{ label }}</label>
            <select
                  :id="name"
                  @input="$emit('update:modelValue', $event.target.value)"
            >
                  <option v-for="i in values" :key="i" :value="i">
                        {{ fn(i) }}
                  </option>
            </select>
      </div>
</template>

<script>
export default {
      name: "SelectInput",

      props: {
            name: {
                  type: String,
                  default: "field",
            },

            label: {
                  type: String,
                  default: "Field",
            },

            values: Array,

            fn: {
                  type: Function,
                  default: (i) => i,
            },
      },
};
</script>

<style lang="scss">
.select-input {
      margin-right: 3em;
      @include flex();

      label {
            margin-right: 0.5em;
      }

      select {
            min-width: 7em;
            border: 1px solid $black;
            padding: 0.1em;
            border-radius: 2px;
            background-color: white;
            &:focus {
                  outline: none;
                  background-color: $white;
            }
      }
}
</style>
