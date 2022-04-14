<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

import { computed, ref, watch } from "vue";

let router = useRouter();
let route = useRoute();

console.log();

let routes: HeaderPage[] = [
      { name: "Settings", label: "Settings", icon: "settings" },
      { name: "Images", label: "Photos", icon: "image" },
      { name: "Chats", label: "Chats", icon: "chat" },
      { name: "Search", label: "Search", icon: "search" },
];

let defaultActive = computed(
      () => routes.findIndex((rt) => rt.name === route.name) + 1
);

let props = defineProps<{ modelValue: boolean }>();

let emit = defineEmits<{
      (e: "update:modelValue", drawer: boolean): void;
}>();

// let drawer = ref(true);
// watch(
//       () => drawer.value,
//       (v) => {
//             emit("update:modelValue", drawer.value);
//       }
// );

let moveTo = async (name: string) => {
      await router.push({ name });
};
</script>

<template>
      <!-- Drawer -->

      <el-drawer
            v-model="modelValue"
            direction="ltr"
            :size="350"
            @open="$emit('update:modelValue', true)"
            @close="$emit('update:modelValue', false)"
      >
            <template #title>
                  <h4>Dating site</h4>
            </template>

            <template #default>
                  <el-menu
                        active-text-color="#409eff"
                        :default-active="`${defaultActive}`"
                        text-color="#000"
                  >
                        <el-menu-item
                              v-for="(rt, i) in routes"
                              :key="i"
                              @click="moveTo(rt.name)"
                              :index="`${i + 1}`"
                        >
                              <span>--> <Icon :name="rt.icon" /></span>
                              <span>{{ rt.label }}</span>
                        </el-menu-item>

                        <!-- <el-menu-item @click="moveTo('Settings')" index="1">
                              <i-mdi-settings />
                              <span>Settings</span>
                        </el-menu-item>

                        <el-menu-item @click="moveTo('Images')" index="2">
                              <i-mdi-image />
                              <span>Photos</span>
                        </el-menu-item>

                        <el-menu-item @click="moveTo('Settings')" index="3">
                              <i-mdi-chat />
                              <span>Chats</span>
                        </el-menu-item>

                        <el-menu-item @click="moveTo('Settings')" index="4">
                              <i-mdi-search />
                              <span>Find matches</span>
                        </el-menu-item> -->
                  </el-menu>
            </template>

            <template #footer>
                  <div style="flex: auto">
                        <el-button type="danger" circle>
                              <i-mdi-log-out style="font-size: 1.1em" />
                        </el-button>
                  </div>
            </template>
      </el-drawer>
      <!-- Drawer -->
</template>

<style lang="scss">
.el-menu-item {
      svg {
            font-size: 1.1em;
            margin-right: 0.5em;
      }
}
</style>
