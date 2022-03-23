<template>
      <div v-if="show" class="options-listing">
            <span
                  class="opt"
                  v-for="(option, i) in options"
                  :key="i"
                  @click="$emit('update:modelValue', option.id)"
            >
                  {{ option.name }}
            </span>
      </div>
</template>

<script>
import { computed } from "vue";
export default {
      name: "OptionsListing",

      props: {
            options: {
                  type: Array,
                  default: [],
            },

            modelValue: [Number, String],
      },

      emits: ["update:modelValue"],

      setup(props) {
            let show = computed(() => props.options.length > 0);

            return {
                  show,
            };
      },
};
</script>

<style lang="scss">
.options-listing {
      background-color: $white;
      position: absolute;
      z-index: 10;
      top: 4.5em;
      right: 0;
      left: 0;
      max-height: 45vh;
      overflow-y: scroll;

      @include shadow($blure: 7px, $spread: 3px, $c: $black, $inset: false);

      border-radius: $border-radius;

      &::-webkit-scrollbar {
            display: none;
      }

      span {
            display: block;
            padding: 1em 2em;
            border-radius: $border-radius;
            cursor: pointer;

            @include shadow($blure: 3px);

            &:hover {
                  @include shadow($blure: 17px);
            }
      }
}
</style>
