<template>
      <Guest>
            <Form id="login" @form-submitted="submit">
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
import validators, { debounce } from "../../helpers";

import { ref, watch, computed } from "vue";

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
            let food = ref(false);

            let login = ref({
                  email_or_username: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.email(v) || validators.name(v);
                        },
                  },
                  password: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return validators.password(v);
                        },
                  },

                  remember: {
                        value: null,
                        valide: function (v = this.value) {
                              if (v === null) return true;
                              return v;
                        },
                  },
            });

            let isValidForm = computed(() => {
                  let bool = true;
                  for (let field of Object.keys(login.value)) {
                        bool = bool && login.value[field].valide();
                  }
                  return bool;
            });

            let submit = () => {
                  if (!isValidForm) return;
                  console.log(login.value);
            };

            return {
                  login,
                  submit,
                  food,
            };
      },
};
</script>

<style lang="scss"></style>
