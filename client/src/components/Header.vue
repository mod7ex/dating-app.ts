<template>
      <header>
            <h1>
                  <router-link :to="{ name: 'Home' }">Brand</router-link>
            </h1>

            <nav>
                  <button
                        class="menu-btn"
                        @click="showMenu = !showMenu"
                        @blur="showMenu = false"
                  >
                        <img
                              src="../assets/svg/menu.svg"
                              :class="{ visibleMenue: showMenu }"
                        />
                  </button>
                  <Transition name="nav">
                        <ul v-if="showMenu">
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
                  </Transition>
            </nav>
      </header>
</template>

<script>
import { ref } from "vue";

export default {
      name: "Header",

      setup() {
            let showMenu = ref(false);

            return {
                  showMenu,
            };
      },
};
</script>

<style lang="scss">
header {
      width: 100%;
      padding: 0.5em;
      text-align: center;
      @include center();
      color: $black;

      h1 {
            margin-bottom: 0.5em;
            a {
                  color: $brand-color !important;
            }
      }

      a {
            &:visited {
                  color: $black;
            }
      }

      nav {
            overflow: hidden;
            width: 100%;

            .menu-btn {
                  border-radius: 50%;

                  img {
                        border-radius: 50%;
                        border: 3px solid $black;
                        padding: 0.3em;
                        cursor: pointer;

                        &:hover,
                        &.visibleMenue {
                              @include shadow($c: $black);
                              filter: invert(26%) sepia(97%) saturate(1888%)
                                    hue-rotate(214deg) brightness(94%)
                                    contrast(95%);
                        }
                  }
            }

            ul {
                  background-color: $white;
                  li {
                        @include shadow();
                        background-color: $brand-color;

                        a {
                              display: inline-block;
                              color: $white;
                              line-height: 2rem;
                              padding: 0.5rem;
                              font-weight: bold;
                        }

                        &:hover {
                              background-color: $white;
                              a {
                                    color: $brand-color;
                              }
                        }
                  }
            }

            .nav-enter-active {
                  transition: all 1s ease;
            }

            .nav-leave-active,
            .nav-enter-active {
                  height: 9rem; // (0.5 * 2 + 2)*3 rem
            }

            .nav-enter-from {
                  height: 0;
            }

            .nav-leave-active,
            .nav-enter-from {
                  transition: all 1s ease;
            }

            .nav-leave-to {
                  height: 0;
            }
      }

      @media screen and (min-width: $screen-small) {
            @include flex($justify: space-between);

            h1 {
                  margin: 0;
            }

            nav {
                  overflow: visible;
                  width: max-content;
                  min-width: 11em;
                  position: relative;

                  .menu-btn {
                        z-index: 10;
                  }

                  ul {
                        padding: 0;
                        overflow: hidden;
                        position: absolute;
                        right: 0;
                        left: 0;
                        top: 2.8em;
                        border-radius: $border-radius;

                        li {
                              a {
                                    width: 100%;
                              }
                        }
                  }
            }
      }
}
</style>
