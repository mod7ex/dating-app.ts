<template>
      <Guest>
            <h1>Login page</h1>
            <form action="">
                  <BaseInput />
            </form>
      </Guest>
</template>

<script>
import Guest from "../../layouts/views/Guest.vue";
import BaseInput from "../../components/forms/BaseInput.vue";

export default {
      name: "Login",

      components: {
            Guest,
            BaseInput,
      },
};
</script>

<style lang="scss"></style>
