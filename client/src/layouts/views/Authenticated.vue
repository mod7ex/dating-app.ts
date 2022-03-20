<template>
      <div class="container-auth">
            <Transition name="slide">
                  <Sidebar @hide-sidebar="closeSideBar" v-if="showSidebar" />
            </Transition>

            <header>
                  <button @click="switchSidebar">
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="33"
                              height="33"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                              />
                        </svg>
                  </button>
            </header>

            <div class="content">
                  <slot>Lorem</slot>
            </div>

            <Footer />
      </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Sidebar from "../../components/Sidebar.vue";
import { inject, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
      name: "Authenticated",

      components: {
            Footer,
            Sidebar,
      },

      setup() {
            let store = useStore();

            let socket = inject("socket");

            onMounted(async () => {
                  await store.dispatch("pullUp_access_token");
                  await store.dispatch("pullUp_refresh_token");

                  socket.auth = {
                        accessToken: store.getters.access,
                  };

                  socket.connect();
            });

            onUnmounted(() => {
                  socket.disconnect();
                  console.log(socket);
            });

            let closeSideBar = () => {
                  store.dispatch("closeSidebar");
            };

            let switchSidebar = () => {
                  store.dispatch("switchSidebar");
            };

            let showSidebar = computed(() => store.getters.showSidebar);

            return {
                  switchSidebar,
                  closeSideBar,
                  showSidebar,
            };
      },
};
</script>

<style lang="scss">
.container-auth {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
      position: relative;

      header {
            @include center();
            @include flex($justify: flex-end);
            button {
                  border-radius: 50%;
                  svg {
                        cursor: pointer;
                        background-color: $brand-color;
                        fill: $white;
                        padding: 0.3em;
                        border-radius: 50%;
                        border: 1px solid $brand-color;

                        @include shadow($blure: 3px, $c: $brand-color);

                        &:hover {
                              fill: $brand-color;
                              background-color: $white;

                              @include shadow(
                                    $blure: 3px,
                                    $c: $brand-color,
                                    $inset: true
                              );
                        }
                  }
            }
      }

      .content {
            #settings,
            #messages,
            #photos {
                  .area {
                        @include area($px: 1em, $py: 1em, $mb: 1em, $mt: 1em);
                  }

                  .nav {
                        ul {
                              @include flex($wrap: wrap);

                              li {
                                    margin: 1em;

                                    button {
                                          @include flex();
                                          @include shadow($blure: 3px);
                                          padding: 0.3em;
                                          width: 10em;

                                          &:hover {
                                                @include shadow($blure: 13px);
                                          }

                                          img {
                                                width: 1.3em;
                                                margin-right: 0.3em;
                                          }
                                    }
                              }
                        }
                  }
            }

            @media screen and (min-width: $screen-small * 1.2) {
                  #settings,
                  #messages,
                  #photos {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-column-gap: 1em;

                        .nav {
                              ul {
                                    @include flex(
                                          $direction: column,
                                          $align: flex-start
                                    );

                                    li {
                                          margin-bottom: 1em;
                                    }
                              }
                        }
                  }
            }

            .userForm {
                  .form-field {
                        & > label {
                              min-width: 9em;
                        }

                        &.flex {
                              @include flex();
                        }
                  }
            }
      }

      .slide-enter-active {
            transition: all 0.3s ease-out;
      }

      .slide-leave-active {
            transition: all 0.3s ease-in;
      }

      .slide-enter-from,
      .slide-leave-to {
            transform: translateX(-$screen-small * 0.4);
      }
}
</style>
