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
                                    <button class="btn" @click="save">
                                          Save
                                    </button>
                              </li>
                        </ul>
                  </div>

                  <div class="settings area" v-if="showTabs">
                        <KeepAlive :max="3600">
                              <component :is="component" />
                        </KeepAlive>
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";

import Authenticated from "../../layouts/views/Authenticated.vue";
import Meta from "../../components/settings/Meta.vue";
import Main from "../../components/settings/Main.vue";
import { useStore } from "vuex";

export default {
      name: "Settings",

      components: {
            Authenticated,
            Meta,
            Main,
      },

      setup() {
            let store = useStore();

            let showTabs = computed(() => store.getters.me_ready);

            onMounted(() => {
                  xhrApi.get("/user/me")
                        .then((responce) => {
                              let { user, meta } = responce.data;

                              store.dispatch("set_user", user);
                              store.dispatch("set_meta", meta);
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
            });

            let component = ref("Main");

            let tabs = reactive(["Main", "Meta"]);

            let save = () => {
                  console.log(store.state.me.meta);
                  // xhrApi.patch("/user/update", store.state.me.user)
                  //       .then((responce) => {
                  //             console.log(responce.data);
                  //       })
                  //       .catch((error) => {
                  //             if (error.response) {
                  //                   console.log(error.response.data);
                  //             } else if (error.request) {
                  //                   console.log(error.request);
                  //             } else {
                  //                   console.log("Error", error.message);
                  //             }
                  //       });

                  // xhrApi.patch("/user/update/meta", store.state.me.meta)
                  //       .then((responce) => {
                  //             console.log(responce.data);
                  //       })
                  //       .catch((error) => {
                  //             if (error.response) {
                  //                   console.log(error.response.data);
                  //             } else if (error.request) {
                  //                   console.log(error.request);
                  //             } else {
                  //                   console.log("Error", error.message);
                  //             }
                  //       });
            };

            return {
                  component,
                  tabs,
                  showTabs,
                  save,
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
