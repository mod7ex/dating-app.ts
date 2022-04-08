<script setup lang="ts">
let { id, header } = defineProps<{ id: string; header: boolean }>();
</script>

<template>
      <el-header>
            <div class="content center" v-if="header">
                  <slot name="up"></slot>
            </div>
      </el-header>

      <el-main>
            <div class="content center" :id="id">
                  <slot> default content </slot>
            </div>
      </el-main>

      <el-footer>
            <div class="content center">
                  <slot name="down"> down part </slot>
            </div>
      </el-footer>
</template>

<style lang="scss">
footer {
      background-color: $primary-black;
      color: $white;
}
</style>
