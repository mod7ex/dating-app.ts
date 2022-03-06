<template>
      <div class="user-main user-fields">
            <FormField :valide="first_name.valide" :error="first_name.error">
                  <BaseInput
                        type="text"
                        label="First name"
                        name="first_name"
                        v-model="user.first_name"
                  />
            </FormField>

            <FormField :valide="last_name.valide" :error="last_name.error">
                  <BaseInput
                        type="text"
                        label="Last name"
                        name="last_name"
                        v-model="user.last_name"
                  />
            </FormField>

            <FormField :valide="username.valide" :error="username.error">
                  <BaseInput
                        type="text"
                        label="Username"
                        name="username"
                        v-model="user.username"
                  />
            </FormField>

            <FormField :valide="email.valide" :error="email.error">
                  <BaseInput
                        type="email"
                        label="Email"
                        name="email"
                        v-model="user.email"
                  />
            </FormField>
      </div>
</template>

<script>
import FormField from "../forms/FormField.vue";
import BaseInput from "../forms/BaseInput.vue";

import { required, name, email } from "../../helpers/validators";
import validationHandler from "../../mixins/validation";
import { reactive } from "vue";
export default {
      name: "Main",

      components: {
            FormField,
            BaseInput,
      },

      setup() {
            let user = reactive({
                  first_name: "",
                  last_name: "",
                  email: "",
                  username: "",
            });

            let rules = {
                  first_name: { required, name },
                  last_name: { name },
                  email: { required, email },
                  username: { required, name },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  user
            );

            return {
                  user,
                  ...vHandler,
            };
      },
};
</script>

<style lang="scss">
.user-main {
}
</style>
