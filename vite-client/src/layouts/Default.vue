<script setup lang="ts">
import Base from "./Base.vue";
import Nav from "../components/TheDefaultNav.vue";
import Footer from "../components/TheFooter.vue";
</script>

<template>
      <Base id="default" :header="true">
            <template #up>
                  <Nav />
            </template>

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
#default {
      @include flex($justify: flex-start, $direction: column, $align: stretch);

      .container {
            // lorem
      }
}
</style>
