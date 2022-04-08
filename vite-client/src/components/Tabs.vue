<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

let props = withDefaults(
      defineProps<{
            defaultTab: number;
            comps: { label: string; comp: any }[];
      }>(),
      {
            defaultTab: 1,
      }
);

let activeTab = ref<number>(1);
let currentComp = computed(() => props.comps[Number(activeTab.value) - 1].comp);

const handleSelect = (key: string) => {
      console.log(props.defaultTab);
      activeTab.value = Number(key);
};

onMounted(() => {
      activeTab.value = props.defaultTab;
});
</script>

<template>
      <el-menu
            :default-active="`${activeTab}`"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
      >
            <el-menu-item
                  v-for="(item, i) in comps"
                  :key="i"
                  :index="`${i + 1}`"
            >
                  {{ item.label }}
            </el-menu-item>
      </el-menu>

      <!-- the form -->

      <KeepAlive :max="3600">
            <component :is="currentComp" />
      </KeepAlive>
</template>

<style lang="scss" scoped>
.el-menu {
      margin-bottom: 2em;
      @include flex();
}
</style>
