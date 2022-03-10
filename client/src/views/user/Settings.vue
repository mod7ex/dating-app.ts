<template>
      <Authenticated>
            <div id="settings">
                  <div class="nav area">
                        <ul>
                              <li>
                                    <button @click="component = 'Main'">
                                          <img
                                                src="../../assets/svg/user.svg"
                                          />
                                          main data
                                    </button>
                              </li>
                              <li>
                                    <button @click="component = 'Meta'">
                                          <img
                                                src="../../assets/svg/data.svg"
                                          />
                                          meta data
                                    </button>
                              </li>
                              <li>
                                    <button class="btn">Save</button>
                              </li>
                        </ul>
                  </div>

                  <div class="settings area">
                        <KeepAlive :max="3600">
                              <component :is="component" />
                        </KeepAlive>
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import { reactive, ref } from "vue";

import Authenticated from "../../layouts/views/Authenticated.vue";
import Meta from "../../components/settings/Meta.vue";
import Main from "../../components/settings/Main.vue";

export default {
      name: "Settings",

      components: {
            Authenticated,
            Meta,
            Main,
      },

      setup() {
            let component = ref("Meta");

            let tabs = reactive(["Main", "Meta"]);

            return {
                  component,
                  tabs,
            };
      },
};
</script>

<style lang="scss">
#settings {
      .settings {
            .user-fields {
                  @include flex($wrap: wrap, $justify: flex-start);

                  .form-field {
                        flex-grow: 1;
                        flex-basis: 30em;
                        margin-left: 1.3em;
                        margin-right: 1.3em;
                  }
            }
      }
}
</style>
