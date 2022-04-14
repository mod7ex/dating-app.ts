<script setup lang="ts">
import { h, ref } from "vue";

let props = withDefaults(defineProps<{ name: string }>(), {
      name: "edit",
});

const icon = () => {
      return h(`i-mdi-${props.name}`);
};

// let component = ref(`i-mdi-${props.name}`);
</script>

<template>
      <!-- <icon /> -->

      <el-icon color="primary">
            <i-mdi-edit />
      </el-icon>

      <!-- <component :is="component" /> -->
</template>
