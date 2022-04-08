<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();

let comps = [
      {
            label: "Login",
            comp: defineAsyncComponent(() => import("@/components/Login.vue")),
      },
      {
            label: "Sign-Up",
            comp: defineAsyncComponent(
                  () => import("@/components/Register.vue")
            ),
      },
];
</script>

<template>
      <Default>
            <div class="auth-form">
                  <Tabs
                        :comps="comps"
                        :defaultTab="route.query.tab != '1' ? 2 : 1"
                  />
            </div>
      </Default>
</template>

<style lang="scss">
.el-form-item {
      &.cta-auth {
            @include flex($justify: space-between);
            .cta-other-auth {
                  margin-left: auto;
                  @include flex();
            }
      }
}
</style>
