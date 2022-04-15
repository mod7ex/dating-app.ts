<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

let props = withDefaults(
      defineProps<{
            meta?: string;
            src: string;
            margin?: boolean;
            containerWidth: number;
      }>(),
      {
            meta: "Image tag",
            margin: true,
      }
);

let mouseIn = ref(false);

let img = ref<HTMLImageElement>(null);
let imgContainer = ref<HTMLElement>(null);

onMounted(() => {
      // console.log("container ==> ", props.containerWidth);

      img.value.onload = function () {
            imgContainer.value.style.margin = props.margin ? ".3em" : "";

            // let IMGratio = img.value.height / img.value.width;

            setTimeout(() => {
                  let percentage = img.value.width / props.containerWidth;

                  console.log(percentage);

                  imgContainer.value.style.flexGrow = `${percentage + 1}`;

                  imgContainer.value.style.maxWidth = `${
                        img.value.width * (percentage + 1.37)
                  }px`;
            }, 1000);
      };
});
</script>

<template>
      <div
            class="photo"
            :ref="(el) => (imgContainer = el)"
            @mouseenter="mouseIn = true"
            @mouseleave="mouseIn = false"
      >
            <img :src="src" :alt="meta" :ref="(el) => (img = el)" />

            <div class="overlay" v-if="mouseIn">
                  <el-button circle>
                        <el-icon color="primary">
                              <i-mdi-delete />
                        </el-icon>
                  </el-button>

                  <el-button circle>
                        <el-icon color="primary">
                              <i-mdi-zoom-in />
                        </el-icon>
                  </el-button>
            </div>
      </div>
</template>

<style lang="scss" scoped>
.photo {
      height: 13em;
      position: relative;

      .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.6);
            @include flex($gap: 0.5em);
      }

      img {
            height: 100%;
            width: 100%;
      }
}
</style>
