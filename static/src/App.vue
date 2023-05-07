<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";
import { initI18nLocale } from "./i18n";
import { themeStore } from "./stores/theme";
import ProgressBar from "./components/ProgressBar.vue";

const initDone = ref(false);
async function init() {
  const t = useI18n();
  const ts = themeStore();
  await initI18nLocale(t);
  await ts.init();
  initDone.value = true;
}
init();
</script>

<template>
  <ProgressBar />
  <RouterView v-if="initDone" />
</template>
