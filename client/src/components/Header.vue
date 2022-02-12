<template>
      <header>
            <h1>
                  <router-link :to="{ name: 'Home' }">Brand</router-link>
            </h1>

            <span class="menu-btn" @click="showMenu = !showMenu">
                  <img src="../assets/svg/menu.svg" alt="menu" />
            </span>

            <nav v-if="showMenu">
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
      @include flex(
            $align: stretch,
            $justify: space-between,
            $direction: column,
            $wrap: nowrap
      );

      .menu-btn {
            img {
                  border: 1px solid black;
                  border-radius: 50%;
                  padding: 0.3em;
            }
            cursor: pointer;
      }

      padding-top: 1em;

      text-align: center;

      h1 {
            margin-bottom: 0.5em;
      }

      a {
            color: $black;
            &:visited {
                  color: $black;
            }
      }

      nav {
            background-color: green;
            // height: 5px;
            ul {
                  li {
                        padding: 0.3em;
                        &:hover {
                              background-color: $brand-color;
                        }

                        a {
                              font-weight: bold;
                              &:hover {
                                    color: $white;
                              }
                        }
                  }
            }
      }
}
</style>
