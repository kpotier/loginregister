import { authStore } from "@/stores/auth";
import { visible } from "@/stores/progressBar";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import Error404View from "../views/Error404View.vue";
import auth from "./auth";
import settings from "./settings";

// Note: by default, requiresAuth is true.

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [settings],
    },
    { ...auth },
    {
      path: "/:pathMatch(.*)*",
      component: Error404View,
      meta: { everyone: true },
    },
  ],
});

router.beforeEach(async (to) => {
  visible.value = { to: to, count: visible.value.count + 1 };

  if (to.meta.requiresAuth === undefined) to.meta.requiresAuth = true;
  const as = authStore();
  const loggedIn = await as.isLoggedIn();

  if (to.meta.requiresAuth && !loggedIn && !to.meta.everyone) {
    as.redirectTo = to.fullPath;
    return { name: "authSignIn" };
  }

  if (!to.meta.requiresAuth && loggedIn && !to.meta.everyone) {
    return { name: "home" };
  }
});

router.afterEach((to, from, failed) => {
  if (
    failed?.type !== 8 &&
    (visible.value.to === to || visible.value.to == to.redirectedFrom)
  )
    visible.value = { to: {} as RouteLocationNormalized, count: 0 };
});

export default router;
