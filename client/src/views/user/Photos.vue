<template>
      <div
            class="overlay"
            @click.self="emptyCurrentImg"
            v-if="currentImg != null"
      >
            <button @click="switchPhoto(true)">
                  <img src="../../assets/svg/left.svg" />
            </button>

            <div class="container">
                  <img :src="photos[currentImg]" />
            </div>

            <button @click="switchPhoto(false)">
                  <img src="../../assets/svg/right.svg" />
            </button>
      </div>
      <Authenticated>
            <div id="photos">
                  <div class="nav area">
                        <ul>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/favorite.svg"
                                          />
                                          delete all photos
                                    </button>
                              </li>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/message.svg"
                                          />
                                          upload photo
                                    </button>
                              </li>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/block.svg"
                                          />
                                          blocked
                                    </button>
                              </li>
                        </ul>
                  </div>

                  <div class="photos area">
                        <div
                              class="item"
                              v-for="i in len"
                              :key="i"
                              @click="currentImg = i - 1"
                        >
                              <img :src="photos[i - 1]" />
                        </div>

                        <!-- <div class="media">
                              <div class="photo">
                                    <img :src="photos[i]" />
                              </div>
                        </div>
                        <div class="photos-nav">
                              <button @click="switchPhoto(true)">
                                    <img
                                          src="../../assets/svg/left.svg"
                                          alt=""
                                    />
                              </button>
                              <button @click="switchPhoto(false)">
                                    <img
                                          src="../../assets/svg/right.svg"
                                          alt=""
                                    />
                              </button>
                        </div> -->
                  </div>
            </div>
      </Authenticated>
</template>

<script>
import { ref } from "vue";

import Authenticated from "../../layouts/views/Authenticated.vue";

export default {
      name: "Photos",
      components: {
            Authenticated,
      },

      setup() {
            let currentImg = ref(null);
            let emptyCurrentImg = () => {
                  currentImg.value = null;
            };

            let photos = [
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWZm7Gesmm9rNpAgmhlvW3t4B_Y3V15ZvgQ&usqp=CAU",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
                  "https://static.showit.co/400/vXf7Xr4PS0q6IgNnRs_ZRA/100992/photosbypalamikayla_424of530.jpg",
                  "https://i.guim.co.uk/img/media/f79f2587bf6cd5540749601211f3d42d0f36d117/0_421_6720_4032/master/6720.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9627285c1c05ba52a09d0990a95cd12f",
                  "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
                  "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg",
                  "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8lyAwQqh3KEIVE7bK8B1qu-nPACDTa2Gsw&usqp=CAU",
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWZm7Gesmm9rNpAgmhlvW3t4B_Y3V15ZvgQ&usqp=CAU",
                  "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-fr.jpg",
                  "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg",
                  "https://i.guim.co.uk/img/media/f79f2587bf6cd5540749601211f3d42d0f36d117/0_421_6720_4032/master/6720.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9627285c1c05ba52a09d0990a95cd12f",
                  "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/03/28/Local-Politics/Images/Supreme_Court_Gorsuch_Moments_22084-70c71-0668.jpg?t=20170517",
            ];

            let len = ref(photos.length);

            let switchPhoto = (bool) => {
                  if (bool)
                        currentImg.value =
                              (currentImg.value + 1) % photos.length;
                  else
                        currentImg.value =
                              (currentImg.value + photos.length - 1) %
                              photos.length;
            };

            return {
                  photos,
                  len,
                  switchPhoto,
                  currentImg,
                  emptyCurrentImg,
            };
      },
};
</script>

<style lang="scss">
.overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: rgba(black, 0.9);
      padding: 1em;
      @include flex();

      .container {
            align-self: stretch;
            flex-grow: 1;
            padding: 1em;
            background-color: $brand-color;
            max-width: $screen-small;
            border-radius: $border-radius;
            position: relative;
            max-height: 97vh;

            @include flex();

            img {
                  width: 100%;
                  max-height: 100%;
            }
      }

      button {
            img {
                  width: 3.5em;
            }
      }
}

#photos {
      .photos {
            // @include flex(
            //       $justify: flex-start,
            //       $align: flex-start,
            //       $wrap: wrap
            // );

            // display: grid;
            // grid-column-gap: 0.3em;
            // grid-row-gap: 0.3em;
            // grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
            // grid-auto-rows: 0;

            // display: flex;
            // flex-direction: column;
            // flex-wrap: wrap;
            // align-content: flex-start;

            display: flex;
            gap: 0.5em;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;

            .item {
                  height: 11em;
                  max-width: max-content;
                  flex-basis: 1;
                  flex-grow: 1;
                  flex-shrink: 1;
                  background-color: red;
                  img {
                        border-radius: $border-radius * 0.5;
                        height: 100%;
                        width: 100%;

                        cursor: pointer;

                        @include shadow($blure: 3px);

                        &:hover {
                              @include shadow($blure: 13px);
                        }
                  }
            }

            // .media {
            //       @include center($screen-small * 0.7);

            //       img {
            //             width: 100%;
            //       }
            // }

            // .photos-nav {
            //       @include flex($justify: space-between);
            //       @include center($screen-small * 0.7);
            // }
      }
}
</style>
