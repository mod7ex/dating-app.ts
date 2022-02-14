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
            color: $black;
            &:visited {
                  color: $black;
            }
      }

      nav {
            overflow: hidden;
            width: 100%;

            .menu-btn {
                  img {
                        border-radius: 50%;
                        border: 3px solid $black;
                        padding: 0.3em;
                        cursor: pointer;

                        &:hover,
                        &.visibleMenue {
                              filter: invert(26%) sepia(97%) saturate(1888%)
                                    hue-rotate(214deg) brightness(94%)
                                    contrast(95%);
                        }
                  }
            }

            ul {
                  background-color: rgba($brand-color, 0.3);
                  li {
                        padding: 0.3em;

                        a {
                              font-weight: bold;
                        }

                        &:hover {
                              background-color: $brand-color;
                              a {
                                    color: $white;
                              }
                        }
                  }
            }

            .nav-enter-active {
                  transition: all 1s ease;
            }

            .nav-leave-active,
            .nav-enter-active {
                  height: 87px;
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

                        background-color: $brand-color;
                        li {
                              a {
                                    color: $white !important;
                                    display: inline-block;
                                    padding: 0.3em;
                                    width: 100%;
                                    &:hover {
                                          color: $black !important;
                                    }
                              }

                              &:hover {
                                    background-color: $white;
                              }
                        }
                  }
            }
      }
}
</style>
