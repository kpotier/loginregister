<script setup lang="ts">
import { authStore } from "@/stores/auth";
import router from "@/router/index";
import SiteLogo from "../../components/SiteLogo.vue";
import { useI18n } from "vue-i18n";
import { Config } from "@/config";
import { setI18nLocale } from "@/i18n";
import { themeStore, Theme } from "@/stores/theme";
import { ref } from "vue";

const as = authStore();
if (as.user != undefined) {
  router.push("/");
}

const t = useI18n();
const ts = themeStore();

const localeLoading = ref(false);

function changeLocale(e: Event) {
  if (e.target instanceof HTMLSelectElement) {
    localeLoading.value = true;
    setI18nLocale(t, e.target.value).then(() => {
      localeLoading.value = false;
    });
  }
}
</script>

<template>
  <div id="auth" class="container">
    <div class="auth-box">
      <header>
        <RouterLink to="/" :aria-label="$t('auth.goBackSignInLink')">
          <SiteLogo class="logo" />
        </RouterLink>
        <div class="settings">
          <div class="select" :class="{ 'is-loading': localeLoading }">
            <select
              :title="$t('auth.changeLocale')"
              class="input lang"
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
          <button
            class="theme"
            @click="ts.toggleTheme"
            :title="$t('auth.changeTheme')"
          >
            <font-awesome-icon
              v-if="ts.theme === Theme.Dark"
              icon="fa-solid fa-sun"
            />
            <font-awesome-icon
              v-if="ts.theme === Theme.Light"
              icon="fa-solid fa-moon"
            />
          </button>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/functions";
@import "@/assets/base/mixins";
@import "@/assets/base/extends";

$auth-gap: $gap;
$auth-padding: $padding;
$auth-padding-large: $padding-large;
$auth-mobile-header-gap: ($auth-padding-large * 1.3);

#auth {
  &.container {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;

    @include until($mobile) {
      min-height: auto;
      padding: 0 !important;
    }
  }

  .auth-box {
    @include until($mobile) {
      border: none;
      max-width: none;
    }

    border: $border-width $border-style var(--c-border);
    border-radius: $border-radius;
    max-width: 35rem;
    width: 100%;
  }

  header {
    @include until($mobile) {
      padding: $auth-padding;
      padding-left: 0; // because of logo padding
      padding-right: 0; // because of theme padding
    }

    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: $auth-gap;
    padding: $auth-padding-large;
    padding-bottom: 0;
    padding-right: (
      ($auth-padding-large) - $auth-padding
    ); // because of theme padding
  }

  .logo {
    @include until($mobile) {
      padding-left: $auth-padding;
    }
  }

  .settings {
    display: flex;

    > .theme {
      @extend %control;

      color: var(--c-text);
      cursor: pointer;
      font-size: $font-size-large;
      padding: 0 $auth-padding;
      transition: color $transition;

      &:hover,
      &:focus,
      &:active {
        color: get-color("primary", 1);
      }
    }
  }

  main {
    @include until($mobile) {
      margin-top: $auth-mobile-header-gap;
    }

    padding: $auth-padding-large;
    padding-top: 0 !important;
  }
}
</style>
