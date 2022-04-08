<script setup lang="ts">
import { useRouter } from "vue-router";

import { ref, watch } from "vue";

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

let router = useRouter();

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
                        default-active="2"
                        text-color="#000"
                  >
                        <el-menu-item @click="moveTo('Settings')" index="1">
                              <i-mdi-settings />
                              <span>Settings</span>
                        </el-menu-item>

                        <el-menu-item @click="moveTo('Settings')" index="2">
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
                        </el-menu-item>
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
