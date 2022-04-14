<script setup lang="ts">
import { defineAsyncComponent } from "vue";

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

<style lang="scss">
.input-area {
      @include flex($wrap: wrap, $align: flex-start, $gap: 1em);

      textarea {
            display: inline-block;
            min-width: $form-width !important;
            width: 100%;
            resize: none !important;
      }

      .el-form-item {
            flex-basis: 17em;
            flex-shrink: 0;
            flex-grow: 1;

            .slider-demo-block {
                  min-width: 17em;
                  width: 100%;
            }
      }
      margin-bottom: 2em;
}
</style>
