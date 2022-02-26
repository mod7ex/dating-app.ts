<template>
      <Guest>
            <Form id="login" @form-submitted="submit">
                  <template v-slot:header>
                        <h1>Login</h1>
                  </template>

                  <!-- Default slot -->
                  <FormField
                        :valide="email_or_username.valide"
                        :error="email_or_username.error"
                  >
                        <BaseInput
                              type="text"
                              label="Email or username"
                              name="email_or_username"
                              :mandatory="true"
                              v-model="login.email_or_username"
                        />
                  </FormField>

                  <FormField :valide="password.valide" :error="password.error">
                        <BaseInput
                              type="password"
                              label="Password"
                              name="password"
                              :mandatory="true"
                              v-model="login.password"
                        />
                  </FormField>

                  <FormField class="form-checkbox">
                        <BaseInput
                              name="remember"
                              type="checkbox"
                              label="Remember me"
                              v-model="login.remember"
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
import Form from "../../layouts/Form.vue";
import BaseInput from "../../components/forms/BaseInput.vue";
import SubmitInput from "../../components/forms/SubmitInput.vue";
import Guest from "../../layouts/views/Guest.vue";
import { reactive } from "vue";
import { required, password, login_field } from "../../helpers/validators";
import validationHandler from "../../mixins/validation";
import { useRouter } from "vue-router";

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
            const router = useRouter();

            let login = reactive({
                  email_or_username: null,

                  password: null,

                  remember: false,
            });

            let rules = {
                  email_or_username: {
                        required,
                        login_field,
                  },

                  password: {
                        required,
                        password,
                  },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  login
            );

            let submit = async () => {
                  formTouch();
                  if (!isValideForm.value) return;
                  console.log(login);

                  await router.push({
                        name: "Settings",
                  });
            };

            // let { email_or_username, password, remember } = toRefs(login);

            return {
                  login,
                  submit,
                  ...vHandler,
            };
      },
};
</script>

<style lang="scss"></style>
