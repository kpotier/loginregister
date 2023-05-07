<script lang="ts" setup>
import { authStore } from "@/stores/auth";
const as = authStore();
</script>

<template>
  <h1 class="title">{{ $t("settings.title") }}</h1>
  <main class="columns">
    <div class="column left">
      <div class="element">
        <router-link class="settings-link" :to="{ name: 'settingsAppearance' }">
          {{ $t("settings.appearance") }}
        </router-link>
        <router-link class="settings-link" :to="{ name: 'settingsEmail' }">
          {{ $t("settings.email") }}
        </router-link>
        <router-link class="settings-link" :to="{ name: 'settingsPwd' }">
          {{ $t("settings.pwd") }}
        </router-link>
        <router-link class="settings-link" :to="{ name: 'settingsDelete' }">
          {{ $t("settings.delete") }}
        </router-link>
      </div>
      <div class="element">bank panel</div>
      <div v-if="as.user?.user?.admin" class="element">admin panel</div>
    </div>
    <div class="column right">
      <div class="element has-padding">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/functions";

.element .settings-link {
  background-color: var(--c-background);
  border-left: 0;
  color: var(--c-color);
  display: block;
  padding: ($padding-small);
  transition: border-width $transition, background-color $transition;

  &:hover {
    background-color: var(--c-background-soft);
  }

  &.router-link-active {
    background-color: var(--c-background-soft);
    border-left: $border-radius $border-style get-color("primary", 1);
  }
}
</style>
