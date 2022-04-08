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
