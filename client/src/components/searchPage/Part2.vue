<template>
      <FormField>
            <BaseInput
                  type="text"
                  label="Email or username"
                  name="email_or_username"
            />
      </FormField>

      <FormField>
            <BaseInput type="password" label="Password" name="password" />
      </FormField>
</template>

<script>
import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";

export default {
      name: "Part2",

      components: {
            FormField,
            BaseInput,
      },
};
</script>

<style lang="scss"></style>
