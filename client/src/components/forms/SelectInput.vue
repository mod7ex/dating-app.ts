<template>
      <div>
            <label :for="name"></label>
            <select :name="name" :id="name">
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

            values: [String, Number],
            fn: {
                  type: Function,
                  default: (i) => i,
            },
      },
};
</script>

<style></style>
