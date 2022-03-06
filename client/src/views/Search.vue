<template>
      <Authenticated>
            <Form id="searchForm" @form-submitted="submit" class="userForm">
                  <template v-slot:header>
                        <h1>Search for matche</h1>

                        <span class="nav">
                              <button
                                    v-for="tab in tabs"
                                    :key="tab"
                                    @click="component = tab"
                                    :class="{ active: component == tab }"
                              ></button>
                        </span>
                  </template>

                  <!-- Default slot -->

                  <KeepAlive :max="3600">
                        <component :is="component" :vHandler="vHandler" />
                  </KeepAlive>

                  <!-- Default slot -->

                  <template v-slot:submit>
                        <FormField class="form-submit">
                              <SubmitInput value="Search" />
                        </FormField>
                  </template>
            </Form>
      </Authenticated>
</template>

<script>
import FormField from "../components/forms/FormField.vue";
import Form from "../layouts/Form.vue";
import SubmitInput from "../components/forms/SubmitInput.vue";

import Part1 from "../components/search/Part1.vue";
import Part2 from "../components/search/Part2.vue";
import Part3 from "../components/search/Part3.vue";

import Authenticated from "../layouts/views/Authenticated.vue";

import { ref, reactive } from "vue";
import { useStore } from "vuex";

import validationHandler from "../mixins/validation";
import { name, phone_number } from "../helpers/validators";

export default {
      name: "Search",
      components: {
            Authenticated,
            Form,
            FormField,
            SubmitInput,
            Part1,
            Part2,
            Part3,
      },

      setup() {
            let store = useStore();

            let tabs = ["Part1", "Part2", "Part3"];

            let component = ref("Part1");

            let searchForm = reactive(store.state.app.searchForm);

            let rules = {
                  username: { name },
                  name: { name },
                  phone_number: { phone_number },
            };

            let { vHandler, isValideForm, formTouch } = validationHandler(
                  rules,
                  searchForm
            );

            let submit = () => {
                  formTouch();
                  console.log(isValideForm.value);
                  console.log(searchForm);
                  if (!isValideForm.value) return;
            };

            return {
                  submit,
                  tabs,
                  component,
                  vHandler,
            };
      },
};
</script>

<style lang="scss">
#searchForm {
      @include center($screen-medium);

      .form-header {
            @include flex($justify: space-between);

            .nav {
                  button {
                        margin: 0.3em;
                        padding: 0.5em;
                        border-radius: 50%;
                        border: 1px solid $brand-color;

                        @include shadow(
                              $blure: 5px,
                              $c: $brand-color,
                              $inset: true
                        );

                        &.active {
                              background-color: $brand-color;
                        }
                  }
            }
      }
}
</style>
