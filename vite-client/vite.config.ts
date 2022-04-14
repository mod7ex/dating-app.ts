import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
      plugins: [
            vue(),

            AutoImport({
                  resolvers: [ElementPlusResolver()],
            }),

            Components({
                  resolvers: [
                        ElementPlusResolver(),
                        IconsResolver({ prefix: "i" }),
                  ],
            }),

            Icons({
                  // expiremental
                  autoInstall: true,

                  scale: 1, // Scale of icons against 1em
                  defaultStyle: "", // Style apply to icons
                  defaultClass: "app-icon", // Class names apply to icons
                  compiler: "vue3", // 'vue2', 'vue3', 'jsx'
                  jsx: "react", // 'react' or 'preact'
            }),
      ],

      define: { "process.env": {} },

      resolve: {
            alias: {
                  "@": resolve(__dirname, "src"),
            },
      },

      base: "/",

      css: {
            preprocessorOptions: {
                  scss: {
                        additionalData: `
                              @import "@/assets/scss/_variables.scss";
                              @import "@/assets/scss/_mixins.scss";`,
                  },
            },
      },
});

/*
      @import "@/assets/scss/_functions.scss";
      @import "@/assets/scss/_reset.scss";
      @import "@/assets/scss/_keyframes.scss";
*/
