// src/router/index.ts (or .js)
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import userLocation from "@/pages/userLocation.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
  },
  {
    path: "/search",
    name: "About",
    component: userLocation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
