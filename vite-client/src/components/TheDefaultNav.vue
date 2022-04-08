<script setup lang="ts">
import { reactive } from "vue";

let pages = reactive<HeaderPage[]>([
      { name: "Home", label: "home" },
      { name: "Auth", label: "authenticate" },
]);
</script>

<template>
      <div id="default-nav">
            <ul>
                  <template v-for="(page, i) in pages" :key="i">
                        <el-divider direction="vertical" v-if="i != 0" />
                        <li>
                              <router-link :to="{ name: page.name }">
                                    {{ page.label }}
                              </router-link>
                        </li>
                  </template>
            </ul>
      </div>
</template>

<style lang="scss">
#default-nav {
      margin-bottom: 1em;

      ul {
            @include flex();

            li {
                  a {
                        padding: 0.7em 1.4em;
                        color: $primary-black;
                        font-weight: bolder;

                        &.router-link-active {
                              color: $primary;
                              border-bottom: 2px solid $primary;
                        }

                        &:hover {
                              background-color: rgba($primary, 0.15);
                        }
                  }
            }
      }
}
</style>
