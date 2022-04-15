<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import Photo from "./Photo.vue";

let photos = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWZm7Gesmm9rNpAgmhlvW3t4B_Y3V15ZvgQ&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
      "https://static.showit.co/400/vXf7Xr4PS0q6IgNnRs_ZRA/100992/photosbypalamikayla_424of530.jpg",
      "https://i.guim.co.uk/img/media/f79f2587bf6cd5540749601211f3d42d0f36d117/0_421_6720_4032/master/6720.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9627285c1c05ba52a09d0990a95cd12f",
      "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
      "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWZm7Gesmm9rNpAgmhlvW3t4B_Y3V15ZvgQ&usqp=CAU",
      "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-fr.jpg",
      "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg",
      "https://i.guim.co.uk/img/media/f79f2587bf6cd5540749601211f3d42d0f36d117/0_421_6720_4032/master/6720.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9627285c1c05ba52a09d0990a95cd12f",
      "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517",
];

let container = ref<HTMLElement>(null);

let containerWidth = computed<number>(() =>
      container.value ? container.value.offsetWidth : 0
);
</script>

<template>
      <div class="photos" :ref="(el) => (container = el)">
            <Photo
                  v-for="(link, i) in photos"
                  :key="i"
                  :src="link"
                  :containerWidth="containerWidth"
            />
      </div>
</template>

<style lang="scss">
.photos {
      @include flex($justify: flex-start, $wrap: wrap);
}
</style>
