<script setup lang="ts">
import Base from "./Base.vue";
import Footer from "../components/TheFooter.vue";
import Sidebar from "../components/TheSidebar.vue";
import { ref } from "vue";
let drawer = ref(false);
</script>

<template>
      <Base id="auth" :header="true">
            <template #up>
                  <div id="nav-toggler">
                        <el-button type="primary" circle @click="drawer = true">
                              <i-mdi-menu-open style="font-size: 1.3em" />
                        </el-button>
                  </div>
            </template>

            <Sidebar v-model="drawer" />

            <!-- inside default id -->

            <div class="container">
                  <slot>default content</slot>
            </div>

            <!-- inside default id -->

            <template #down>
                  <TheFooter />
            </template>
      </Base>
</template>

<style lang="scss">
#nav-toggler {
      padding: 1em;
      @include flex();
}

#auth {
      @include flex($justify: flex-start, $direction: column, $align: stretch);

      .container {
            // lorem
      }
}
</style>
