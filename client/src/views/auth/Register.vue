<template>
      <Guest>
            <Form id="login" @form-submitted="submit">
                  <template v-slot:header>
                        <h1>Sign Up</h1>
                  </template>

                  <!-- Default slot -->
                  <FormField :valide="register.first_name.valide()">
                        <BaseInput
                              type="text"
                              label="First name"
                              name="first_name"
                              :mandatory="true"
                              v-model="register.first_name.value"
                        />
                  </FormField>

                  <FormField :valide="register.last_name.valide()">
                        <BaseInput
                              type="text"
                              label="Last name"
                              name="last_name"
                              v-model="register.last_name.value"
                        />
                  </FormField>

                  <FormField :valide="register.username.valide()">
                        <BaseInput
                              type="text"
                              label="Username"
                              name="username"
                              :mandatory="true"
                              v-model="register.username.value"
                        />
                  </FormField>

                  <FormField :valide="register.email.valide()">
                        <BaseInput
                              type="email"
                              label="Email"
                              name="email"
                              :mandatory="true"
                              v-model="register.email.value"
                        />
                  </FormField>

                  <FormField :valide="register.password.valide()">
                        <BaseInput
                              type="password"
                              label="Password"
                              name="password"
                              :mandatory="true"
                              v-model="register.password.value"
                        />
                  </FormField>

                  <FormField :valide="register.password_confirmation.valide()">
                        <BaseInput
                              type="password"
                              label="Confirm password"
                              name="password_confirmation"
                              :mandatory="true"
                              v-model="register.password_confirmation.value"
                        />
                  </FormField>

                  <FormField class="form-checkbox">
                        <BaseInput
                              type="checkbox"
                              label="I agree with"
                              name="agree"
                              :mandatory="true"
                              v-model="register.agree.value"
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
import FormField from "../../components/forms/FormField.vue";
import Guest from "../../layouts/views/Guest.vue";
import Form from "../../layouts/Form.vue";
import BaseInput from "../../components/forms/BaseInput.vue";
import SubmitInput from "../../components/forms/SubmitInput.vue";
import validators, { debounce } from "../../helpers";

import { ref, computed, watch } from "vue";

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
            let register = ref({
                  first_name: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.name(v);
                        },
                  },
                  last_name: {
                        value: null,
                        valide: function (v = this.value) {
                              if (!v) return true;
                              return validators.name(v);
                        },
                  },
                  email: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.email(v);
                        },
                  },
                  username: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.name(v);
                        },
                  },
                  password: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.password(v);
                        },
                  },
                  password_confirmation: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return register.value.password.value == v;
                        },
                  },
                  agree: {
                        value: false,
                        valide: function (v = this.value) {
                              return v;
                        },
                  },
            });

            // for (let field of Object.keys(register.value)) {
            //       watch(
            //             () => register.value[field].value,
            //             (v) => {
            //                   console.log(v);
            //             }
            //       );
            // }

            let isValidForm = computed(() => {
                  let bool = true;
                  for (let field of Object.keys(register.value)) {
                        bool = bool && register.value[field].valide();
                  }
                  return bool;
            });

            let submit = () => {
                  console.log(register.value);
            };

            return {
                  register,
                  submit,
            };
      },
};
</script>

<style lang="scss"></style>
