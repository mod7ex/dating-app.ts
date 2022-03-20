<template>
      <Guest>
            <Form id="login" @form-submitted="submit">
                  <template v-slot:header>
                        <h1>Sign Up</h1>
                  </template>

                  <!-- Default slot -->
                  <FormField
                        :valide="first_name.valide"
                        :error="first_name.error"
                  >
                        <BaseInput
                              type="text"
                              label="First name"
                              name="first_name"
                              :mandatory="true"
                              v-model="register.first_name"
                        />
                  </FormField>

                  <FormField
                        :valide="last_name.valide"
                        :error="last_name.error"
                  >
                        <BaseInput
                              type="text"
                              label="Last name"
                              name="last_name"
                              v-model="register.last_name"
                        />
                  </FormField>

                  <FormField :valide="username.valide" :error="username.error">
                        <BaseInput
                              type="text"
                              label="Username"
                              name="username"
                              :mandatory="true"
                              v-model="register.username"
                        />
                  </FormField>

                  <FormField :valide="email.valide" :error="email.error">
                        <BaseInput
                              type="email"
                              label="Email"
                              name="email"
                              :mandatory="true"
                              v-model="register.email"
                        />
                  </FormField>

                  <FormField :valide="password.valide" :error="password.error">
                        <BaseInput
                              type="password"
                              label="Password"
                              name="password"
                              :mandatory="true"
                              v-model="register.password"
                        />
                  </FormField>

                  <FormField
                        :valide="password_confirmation.valide"
                        :error="password_confirmation.error"
                  >
                        <BaseInput
                              type="password"
                              label="Confirm password"
                              name="password_confirmation"
                              :mandatory="true"
                              v-model="register.password_confirmation"
                        />
                  </FormField>

                  <FormField class="form-checkbox" :error="agree.error">
                        <BaseInput
                              type="checkbox"
                              label="I agree with"
                              name="agree"
                              :mandatory="true"
                              v-model="register.agree"
                        >
                              <router-link :to="{ name: 'About' }">
                                    &nbsp;Terms &amp; services
                              </router-link>
                        </BaseInput>
                  </FormField>

                  <!-- Default slot -->

                  <template v-slot:submit>
                        <FormField class="form-submit">
                              <SubmitInput value="Sign up" />
                        </FormField>
                  </template>
            </Form>
      </Guest>
</template>

<script>
import SubmitInput from "../../components/forms/SubmitInput.vue";
import FormField from "../../components/forms/FormField.vue";
import BaseInput from "../../components/forms/BaseInput.vue";
import Guest from "../../layouts/views/Guest.vue";
import Form from "../../layouts/Form.vue";

import {
      required,
      name,
      email,
      password,
      equale_to,
} from "../../helpers/validators";
import validationHandler from "../../mixins/validation";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
      name: "Register",

      components: {
            Guest,
            BaseInput,
            Form,
            FormField,
            SubmitInput,
      },

      setup() {
            let router = useRouter();

            let register = reactive({
                  first_name: "",
                  last_name: "",
                  email: "",
                  username: "",
                  password: "",
                  password_confirmation: "",
                  agree: false,
            });

            let rules = {
                  first_name: { required, name },
                  last_name: { name },
                  email: { required, email },
                  username: { required, name },
                  password: { required, password },
                  password_confirmation: {
                        required,
                        password,
                        equale_to: equale_to("password", register),
                  },
                  agree: { required },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  register
            );

            let submit = () => {
                  formTouch();

                  if (!isValideForm.value) return;

                  console.log(register);

                  xhrApi.post("/auth/register", register)
                        .then(async (responce) => {
                              console.log(responce.data);

                              await router.push({
                                    name: "Home",
                              });
                        })
                        .catch((error) => {
                              if (error.response) {
                                    console.log(error.response.data);
                              } else if (error.request) {
                                    console.log(error.request);
                              } else {
                                    console.log("Error", error.message);
                              }
                        });
            };

            return {
                  register,
                  submit,
                  ...vHandler,
            };
      },
};
</script>

<style lang="scss"></style>
