<template>
      <form
            :method="method"
            :id="id"
            @submit.prevent="$emit('formSubmitted')"
            :class="class"
      >
            <div class="form-header">
                  <slot name="header">form header</slot>
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

            class: {
                  type: String,
                  default: "",
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
