<script setup lang="ts">
import { h } from "vue";

let props = withDefaults(defineProps<{ name: string }>(), {
      name: "div",
});

const icon = () => {
      return h(`i-mdi-${props.name}`);
};
</script>

<template>
      <icon />
</template>
