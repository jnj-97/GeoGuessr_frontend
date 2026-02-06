// src/router/index.ts (or .js)
import { createRouter, createWebHistory } from "vue-router";
import userLocation from "@/pages/userLocation.vue";
import NearbySearch from "@/pages/NearbySearch.vue";
import MainPage from "@/pages/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
  },
  {
    path: "/search",
    name: "About",
    component: userLocation,
  },
  {
    path: "/nearby",
    name: "Nearby Search",
    component: NearbySearch,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
