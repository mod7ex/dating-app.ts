<template>
      <div id="sidebar" @click.self="closeSidebar">
            <section class="sidebar-content">
                  <button @click="closeSidebar">
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="33"
                              height="33"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                              />
                        </svg>
                  </button>

                  <ul>
                        <li v-for="tab in tabs" :key="tab.name">
                              <router-link
                                    :to="{ name: tab.name }"
                                    exact-active-class="active-link"
                              >
                                    {{ tab.label }}
                              </router-link>
                        </li>

                        <li id="logOut">
                              <button @click="logOut">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="33"
                                          height="33"
                                          viewBox="0 0 24 24"
                                    >
                                          <path
                                                d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z"
                                          />
                                    </svg>
                              </button>
                        </li>
                  </ul>
            </section>
      </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
      name: "Sidebar",

      setup(_, { emit }) {
            const router = useRouter();

            let sidebar = ref(null);
            let tabs = [
                  { name: "Search", label: "search" },
                  { name: "Conversations", label: "conversations" },
                  { name: "Photos", label: "my photos" },
                  { name: "Settings", label: "settings" },
            ];

            let logOut = async () => {
                  await router.push({ name: "Home" });
            };

            let closeSidebar = () => {
                  emit("hideSidebar");
            };

            return {
                  sidebar,
                  closeSidebar,
                  logOut,
                  tabs,
            };
      },
};
</script>

<style lang="scss">
#sidebar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: transparent;

      .sidebar-content {
            @include shadow($x: 3px, $blure: 13px, $spread: 11px, $c: black);
            max-width: $screen-small * 0.4;
            padding: 1em;
            position: sticky;
            top: 0;
            height: 100vh;
            background-color: $brand-color;

            button {
                  cursor: pointer;
                  margin-bottom: 0.3em;
                  svg {
                        border-radius: 50%;
                        fill: $white;
                        padding: 0.5em;
                        @include shadow(
                              $blure: 7px,
                              $spread: 0px,
                              $c: $black,
                              $inset: true
                        );
                  }
            }

            ul {
                  padding: 2em;
                  li {
                        margin-bottom: 1em;
                        text-align: center;
                        a {
                              border-radius: 30px;
                              color: $white;
                              width: 100%;
                              padding: 0.5em;
                              font-weight: bold;

                              @include shadow(
                                    $blure: 7px,
                                    $spread: 0px,
                                    $c: $black
                              );

                              &:hover {
                                    color: $brand-color;
                                    background-color: $white;
                                    @include shadow(
                                          $blure: 7px,
                                          $spread: 0px,
                                          $c: $white
                                    );
                              }

                              &.active-link {
                                    color: $brand-color;
                                    background-color: $white;
                                    @include shadow(
                                          $blure: 7px,
                                          $spread: 0px,
                                          $c: $white
                                    );
                              }
                        }

                        &#logOut {
                              button {
                                    svg {
                                          fill: red;
                                    }
                              }
                        }
                  }
            }
      }
}
</style>
