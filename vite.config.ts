import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(), commonjs()],
  root: "static/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./static/src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          settings: [
            "static/src/views/settings/EmailVue.vue",
            "static/src/views/settings/PwdVue.vue",
            "static/src/views/settings/LayoutVue.vue",
            "static/src/views/settings/AppearanceVue.vue",
            "static/src/views/settings/DeleteVue.vue",
          ],
        },
      },
    },
  },
});
