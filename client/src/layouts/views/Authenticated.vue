<template>
      <div class="container-auth">
            <Transition name="slide">
                  <Sidebar
                        :sidebarIsClosed="showSidebar"
                        @sidebarHidden="showSidebar = false"
                        v-if="showSidebar"
                  />
            </Transition>

            <header>
                  <button @click="showSidebar = !showSidebar">
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="33"
                              height="33"
                              viewBox="0 0 24 24"
                        >
                              <path
                                    d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                              />
                        </svg>
                  </button>
            </header>
            <div class="content">
                  <slot>Lorem</slot>
            </div>

            <Footer />
      </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Sidebar from "../../components/Sidebar.vue";
import { ref } from "vue";

export default {
      name: "Authenticated",
      components: {
            Footer,
            Sidebar,
      },

      setup() {
            let showSidebar = ref(true);

            return {
                  showSidebar,
            };
      },
};
</script>

<style lang="scss">
.container-auth {
      min-height: 100vh;
      display: grid;
      grid-template-rows: auto 1fr auto;
      position: relative;

      header {
            @include flex($justify: flex-end);
            padding: 0.5em 0.5em 0 0.5em;
            button {
                  border-radius: 50%;
                  svg {
                        cursor: pointer;
                        background-color: $brand-color;
                        fill: $white;
                        padding: 0.3em;
                        border-radius: 50%;
                        border: 1px solid $brand-color;

                        @include shadow($blure: 3px, $c: $brand-color);

                        &:hover {
                              fill: $brand-color;
                              background-color: $white;

                              @include shadow(
                                    $blure: 3px,
                                    $c: $brand-color,
                                    $inset: true
                              );
                        }
                  }
            }
      }

      .slide-enter-active {
            transition: all 0.3s ease-out;
      }

      .slide-leave-active {
            transition: all 0.3s ease-in;
      }

      .slide-enter-from,
      .slide-leave-to {
            transform: translateX(-$screen-small * 0.4);
      }
}
</style>
