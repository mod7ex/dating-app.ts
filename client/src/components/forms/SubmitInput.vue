<template>
      <input type="submit" :value="value" class="form-submit-btn" />
</template>

<script>
export default {
      name: "SubmitInput",

      props: {
            value: {
                  type: String,
                  default: "Sbumit",
            },
      },
};
</script>

<style lang="scss"></style>
