<script lang="ts" setup>
import { Config } from "@/config";
import { setI18nLocale } from "@/i18n";
import { authStore } from "@/stores/auth";
import { Theme, themeStore } from "@/stores/theme";
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import SlideAnimation from "../../components/SlideAnimation.vue";

const t = useI18n();
const ts = themeStore();
const as = authStore();

const msgErr: Ref<boolean> = ref(false);
const localeLoading = ref(false);

function changeLocale(e: Event) {
  if (e.target instanceof HTMLSelectElement) {
    localeLoading.value = true;
    const locale = e.target.value;
    as.setLocale(locale, (res) => {
      if (res.ok && as.user && as.user.user) {
        msgErr.value = false;
        as.user.user.locale = locale;
        as.store(as.user);
        setI18nLocale(t, locale).then(() => {
          localeLoading.value = false;
        });
      } else {
        msgErr.value = true;
        localeLoading.value = false;
      }
    });
  }
}

function changeTheme(e: Event) {
  if (e.target instanceof HTMLSelectElement)
    ts.setTheme(e.target.value as Theme);
}
</script>

<template>
  <h2 class="subtitle">{{ $t("settings.appearance") }}</h2>
  <h3 class="subsubtitle">{{ $t("settings.appearanceSub") }}</h3>
  <SlideAnimation>
    <div v-if="msgErr">
      <div class="notification is-danger" aria-live="polite">
        {{ $t("auth.internalErr") }}
      </div>
    </div>
  </SlideAnimation>
  <form>
    <div class="field">
      <label for="locale" class="label">{{ $t("settings.locale") }}</label>
      <div class="control">
        <div class="select" :class="{ 'is-loading': localeLoading }">
          <select
            id="locale"
            class="input"
            @change="changeLocale"
            :disabled="localeLoading"
          >
            <option
              v-for="locale in Config.locale.supported"
              :key="locale"
              :selected="t.locale.value == locale"
            >
              {{ locale }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label for="theme" class="label">{{ $t("settings.theme") }}</label>
      <div class="control">
        <div class="select">
          <select id="theme" class="input" @change="changeTheme">
            <option :value="Theme.Light" :selected="ts.theme === Theme.Light">
              {{ $t("settings.themeLight") }}
            </option>
            <option :value="Theme.Dark" :selected="ts.theme === Theme.Dark">
              {{ $t("settings.themeDark") }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>
