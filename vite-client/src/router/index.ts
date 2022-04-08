import { createRouter, createWebHistory } from "vue-router";

const routes = [
      { path: "/", name: "Home", component: () => import("../views/Home.vue") },

      {
            path: "/auth",
            name: "Auth",
            component: () => import("../views/Auth.vue"),
      },

      {
            path: "/settings",
            name: "Settings",
            component: () => import("../views/Settings.vue"),
      },
];

export default createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
});
