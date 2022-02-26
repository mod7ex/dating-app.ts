<template>
      <Authenticated>
            <Form id="searchForm" @form-submitted="submit">
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

                  <component :is="component" />

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

import Part1 from "../components/searchPage/Part1.vue";
import Part2 from "../components/searchPage/Part2.vue";
import Part3 from "../components/searchPage/Part3.vue";

import Authenticated from "../layouts/views/Authenticated.vue";

import { ref } from "vue";

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
            let submit = () => {};

            let tabs = ["Part1", "Part2", "Part3"];

            let component = ref("Part1");

            return {
                  submit,
                  tabs,
                  component,
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
