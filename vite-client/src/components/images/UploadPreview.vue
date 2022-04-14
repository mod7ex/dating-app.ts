<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

let props = defineProps<{ file: File }>();

let mouseIn = ref(false);
let img = ref<HTMLImageElement>(null);
let fraction = ref<number>(1);

// let previewLink = computed(() => URL.createObjectURL(props.file));

onMounted(() => {
      img.value.src = URL.createObjectURL(props.file);

      img.value.onload = function () {
            // console.log(this.height);
            fraction.value = img.value.naturalWidth / img.value.naturalHeight;
      };
});
</script>

<template>
      <div
            class="preview-img"
            :style="{
                  borderRadius: `var(--el-border-radius-base)`,
                  height: '10em',
                  width: `${fraction * 10}em`,
            }"
            @mouseenter="mouseIn = true"
            @mouseleave="mouseIn = false"
      >
            <img :ref="(el) => (img = el)" />
            <div class="overlay" v-if="mouseIn">
                  <el-button circle>
                        <i-mdi-delete />
                  </el-button>

                  <el-button circle>
                        <i-mdi-zoom-in />
                  </el-button>
            </div>
      </div>
</template>

<style lang="scss">
.preview-img {
      position: relative;
      overflow: hidden;
      padding: 0;
      background-color: green;

      img {
            height: 100%;
            width: 100%;
      }

      .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.6);
            @include flex($gap: 0.5em);
      }
}
</style>
