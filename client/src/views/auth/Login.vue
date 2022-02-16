<template>
      <Guest>
            <Form id="login" @submit.prevent="submit">
                  <template v-slot:header>
                        <h1>Login</h1>
                  </template>

                  <!-- Default slot -->
                  <FormField>
                        <BaseInput
                              type="text"
                              label="Email or username"
                              name="email_or_username"
                              :mandatory="true"
                              v-model="login.email_or_username.value"
                        />
                  </FormField>

                  <FormField>
                        <BaseInput
                              type="password"
                              label="Password"
                              name="password"
                              :mandatory="true"
                              v-model="login.password.value"
                        />
                  </FormField>

                  <FormField class="form-checkbox">
                        <BaseInput
                              type="checkbox"
                              label="Remember me"
                              name="remember"
                              v-model="login.remember.value"
                        />
                  </FormField>
                  <!-- Default slot -->

                  <template v-slot:submit>
                        <FormField class="form-submit">
                              <SubmitInput value="Login" />
                        </FormField>
                  </template>
            </Form>
      </Guest>
</template>

<script>
import FormField from "../../components/forms/FormField.vue";
import Guest from "../../layouts/views/Guest.vue";
import Form from "../../layouts/Form.vue";
import BaseInput from "../../components/forms/BaseInput.vue";
import SubmitInput from "../../components/forms/SubmitInput.vue";

import { ref } from "vue";

export default {
      name: "Login",

      components: {
            Guest,
            BaseInput,
            Form,
            FormField,
            SubmitInput,
      },

      setup() {
            let login = ref({
                  email_or_username: {
                        value: null,
                  },
                  password: {
                        value: null,
                  },

                  remember: {
                        value: null,
                  },
            });

            let submit = () => {
                  console.log(login.value);
            };

            return {
                  login,
                  submit,
            };
      },
};
</script>

<style lang="scss"></style>
