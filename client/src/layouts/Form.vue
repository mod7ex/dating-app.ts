<template>
      <form :method="method" :id="id" @submit.prevent="$emit('formSubmitted')">
            <div class="form-header">
                  <slot name="header"></slot>
            </div>

            <slot>Form</slot>

            <slot name="submit"></slot>
      </form>
</template>

<script>
export default {
      name: "Form",

      props: {
            method: {
                  type: String,
                  default: "post",
            },

            id: String,
      },
};
</script>

<style lang="scss">
form {
      @include center($screen-small);

      @include area();

      .form-header {
            margin-bottom: 2em;
            color: $brand-color;
      }
}
</style>
