<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

let comps = [
      {
            label: "Basic infos",
            comp: defineAsyncComponent(
                  () => import("@/components/settings/Basic.vue")
            ),
      },

      {
            label: "Personal data",
            comp: defineAsyncComponent(
                  () => import("@/components/settings/Meta.vue")
            ),
      },
];
</script>

<template>
      <Auth>
            <Tabs :comps="comps" :defaultTab="2" />
      </Auth>
</template>

<style lang="scss"></style>
