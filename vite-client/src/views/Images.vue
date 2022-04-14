<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

let comps = [
      {
            label: "Upload new images",
            comp: defineAsyncComponent(
                  () => import("@/components/images/Upload.vue")
            ),
      },

      {
            label: "Preview images",
            comp: defineAsyncComponent(
                  () => import("@/components/images/Preview.vue")
            ),
      },
];
</script>

<template>
      <Auth>
            <Tabs :comps="comps" :defaultTab="1" />
      </Auth>
</template>

<style lang="scss"></style>
