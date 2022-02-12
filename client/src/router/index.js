import { createRouter, createWebHistory } from "vue-router";

const routes = [
      {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue"),
      },

      {
            path: "/login",
            name: "Login",
            component: () => import("../views/auth/Login.vue"),
      },

      {
            path: "/register",
            name: "Register",
            component: () => import("../views/auth/Register.vue"),
      },

      {
            path: "/about",
            name: "About",
            component: () => import("../views/About.vue"),
      },
];

const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
});

export default router;
