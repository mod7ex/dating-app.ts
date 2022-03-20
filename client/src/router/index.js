import { createRouter, createWebHistory } from "vue-router";

const routes = [
      {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue"),
      },

      {
            path: "/verify/:id/:verificationCode",
            name: "Verify",
            component: () => import("../views/user/Verify.vue"),
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
            path: "/profile",
            name: "Profile",
            component: () => import("../views/user/Profile.vue"),
      },

      {
            path: "/chat",
            name: "Chat",
            component: () => import("../views/user/Chat.vue"),
      },

      {
            path: "/me/settings",
            name: "Settings",
            component: () => import("../views/user/Settings.vue"),
      },

      {
            path: "/me/conversations",
            name: "Conversations",
            component: () => import("../views/user/Conversations.vue"),
      },

      {
            path: "/me/photos",
            name: "Photos",
            component: () => import("../views/user/Photos.vue"),
      },

      {
            path: "/search",
            name: "Search",
            component: () => import("../views/Search.vue"),
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
