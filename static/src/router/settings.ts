export default {
  name: "settings",
  path: "settings",
  component: () => import("@/views/settings/LayoutVue.vue"),
  redirect: { name: "settingsAppearance" },
  children: [
    {
      name: "settingsAppearance",
      path: "appearance",
      component: () => import("@/views/settings/AppearanceVue.vue"),
    },
    {
      name: "settingsEmail",
      path: "email",
      component: () => import("@/views/settings/EmailVue.vue"),
    },
    {
      name: "settingsPwd",
      path: "pwd",
      component: () => import("@/views/settings/PwdVue.vue"),
    },
    {
      name: "settingsDelete",
      path: "delete",
      component: () => import("@/views/settings/DeleteVue.vue"),
    },
  ],
};
