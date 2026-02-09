// src/router/index.ts (or .js)
import { createRouter, createWebHistory } from "vue-router";
import NearbySearch from "@/pages/NearbySearch.vue";
import MainPage from "@/pages/MainPage.vue";
import NewGame from "@/pages/NewGame.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainPage,
  },
  {
    path: "/new",
    name: "New Game",
    component: NewGame,
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
