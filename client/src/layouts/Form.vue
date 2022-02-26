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
      @include shadow($blure: 3px);
      background-color: white;
      border-radius: $border-radius;
      padding: 2em !important;
      margin-top: 3em !important;
      margin-bottom: 3em !important;
      .form-header {
            margin-bottom: 2em;
            color: $brand-color;
      }
}
</style>
