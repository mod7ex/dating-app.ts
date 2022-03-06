<template>
      <div
            class="overlay"
            @click.self="emptyCurrentImg"
            v-if="currentImg != null"
      >
            <div class="nav-btn">
                  <button @click="switchPhoto(true)">
                        <img src="../../assets/svg/left.svg" />
                  </button>
            </div>

            <div class="container" ref="imgContainer"></div>

            <div class="nav-btn">
                  <button @click="switchPhoto(false)">
                        <img src="../../assets/svg/right.svg" />
                  </button>
            </div>
      </div>

      <Authenticated>
            <div id="photos">
                  <div class="nav area">
                        <ul>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/trash.svg"
                                          />
                                          delete all photos
                                    </button>
                              </li>
                              <li>
                                    <button>
                                          <img
                                                src="../../assets/svg/upload.svg"
                                          />
                                          upload photos
                                    </button>
                              </li>
                        </ul>
                  </div>

                  <div class="photos area">
                        <div
                              class="item"
                              v-for="i in len"
                              :key="i"
                              @click="renderPhoto(i)"
                        >
                              <img :src="photos[i - 1]" />
                        </div>
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

            let imgContainer = ref(null);

            let emptyCurrentImg = () => {
                  currentImg.value = null;
                  imgContainer.value.innerHTML = "";
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

            let renderPhoto = (i) => {
                  currentImg.value = i;
                  let img = new Image();
                  img.src = photos[currentImg.value];

                  setTimeout(() => {
                        imgContainer.value.appendChild(img);
                  }, 300);
            };

            let switchPhoto = (bool) => {
                  imgContainer.value
                        .querySelector("img")
                        .classList.add(bool ? "from_left" : "from_right");

                  if (bool)
                        currentImg.value =
                              (currentImg.value + 1) % photos.length;
                  else
                        currentImg.value =
                              (currentImg.value + photos.length - 1) %
                              photos.length;

                  let img = new Image();
                  img.src = photos[currentImg.value];
                  img.classList.add(bool ? "to_left" : "to_right");

                  setTimeout(() => {
                        imgContainer.value.innerHTML = "";
                        imgContainer.value.appendChild(img);
                  }, 500);

                  console.log(imgContainer.value);
            };

            return {
                  photos,
                  len,
                  switchPhoto,
                  currentImg,
                  emptyCurrentImg,
                  imgContainer,
                  renderPhoto,
            };
      },
};
</script>

<style lang="scss">
@keyframes to_left {
      from {
            transform: translateX(100vw);
      }

      to {
            transform: translateX(0);
      }
}

@keyframes to_right {
      from {
            transform: translateX(-100vw);
      }

      to {
            transform: translateX(0);
      }
}

@keyframes from_left {
      from {
            transform: translateX(0);
      }

      to {
            transform: translateX(-100vw);
      }
}

@keyframes from_right {
      from {
            transform: translateX(0);
      }

      to {
            transform: translateX(100vw);
      }
}

.overlay {
      overflow: hidden;
      @include flex($justify: space-between, $align: stretch);
      background-color: rgba(black, 0.93);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;

      .container {
            padding: 1em;
            align-self: stretch;
            flex-grow: 1;
            max-width: $screen-small;
            border-radius: $border-radius;
            max-height: 97vh;

            @include flex();

            img {
                  width: 100%;
                  max-height: 100%;
                  @include shadow($blure: 23px, $spread: 3px, $c: $white);

                  &.to_left {
                        animation: to_left 1s;
                  }

                  &.to_right {
                        animation: to_right 1s;
                  }

                  &.from_left {
                        animation: from_left 1s;
                  }

                  &.from_right {
                        animation: from_right 1s;
                  }
            }
      }

      .nav-btn {
            z-index: 20;
            background-color: rgba(rgb(22, 22, 22), 0.9);
            @include flex($direction: column);
            button {
                  img {
                        width: 4.5em;
                  }
            }
      }
}

#photos {
      .photos {
            display: flex;
            gap: 0.5em;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;

            .item {
                  height: 11em;
                  // max-width: max-content;
                  max-width: 15em;
                  // flex-basis: 1;
                  flex-grow: 1;
                  flex-shrink: 1;
                  background-color: red;

                  @include shadow($blure: 3px);

                  &:hover {
                        @include shadow($blure: 17px);
                  }

                  img {
                        border-radius: $border-radius * 0.5;
                        height: 100%;
                        width: 100%;

                        cursor: pointer;
                  }
            }
      }
}
</style>
