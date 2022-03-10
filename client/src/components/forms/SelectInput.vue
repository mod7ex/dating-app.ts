<template>
      <div class="select-input">
            <label :for="name">{{ label }}</label>
            <select
                  :id="name"
                  @input="$emit('update:modelValue', $event.target.value)"
            >
                  <option v-if="notselected" disabled selected>select</option>

                  <option
                        v-for="item in items"
                        :key="item.value"
                        :value="item.value"
                  >
                        {{ item.label }}
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

            notselected: {
                  type: Boolean,
                  default: true,
            },

            items: Array,
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
