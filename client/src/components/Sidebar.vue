<template>
      <div id="sidebar" v-clickOutside="closeSidebar">
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
                        <li>
                              <router-link :to="{ name: 'About' }"
                                    >about</router-link
                              >
                        </li>
                        <li>
                              <router-link :to="{ name: 'Login' }"
                                    >login</router-link
                              >
                        </li>
                        <li>
                              <router-link :to="{ name: 'Register' }"
                                    >sign Up</router-link
                              >
                        </li>
                  </ul>
            </section>
      </div>
</template>

<script>
let clickOutside = {
      mounted(el, binding) {
            document.addEventListener("click", function (e) {
                  console.log("hell");
                  if (el.contains(e.target)) return;
                  binding.value();
            });
      },

      beforeUnmount(el, binding) {
            document.removeEventListener("click", function (e) {
                  console.log("hell");
                  if (el.contains(e.target)) return;
                  binding.value();
            });
      },
};

export default {
      name: "Sidebar",

      props: {
            sidebarIsClosed: {
                  type: Boolean,
                  default: true,
            },
      },

      directives: { clickOutside },

      setup(props, { emit }) {
            let closeSidebar = () => {
                  if (!props.sidebarIsClosed) return;
                  emit("sidebarHidden");
            };

            return {
                  closeSidebar,
            };
      },
};
</script>

<style lang="scss">
#sidebar {
      position: absolute;
      top: 0;
      bottom: 0;
      min-width: $screen-small * 0.4;
      background-color: transparent;
      @include shadow($x: 3px, $blure: 13px, $spread: 11px, $c: black);
      .sidebar-content {
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
                        a {
                              border-radius: 30px;
                              color: $white;
                              width: 100%;
                              text-align: center;
                              padding: 0.5em;
                              font-weight: bold;

                              @include shadow(
                                    $blure: 7px,
                                    $spread: 0px,
                                    $c: $black
                              );

                              &:hover {
                                    @include shadow(
                                          $blure: 7px,
                                          $spread: 0px,
                                          $c: $black,
                                          $inset: true
                                    );
                              }
                        }
                  }
            }
      }
}
</style>
