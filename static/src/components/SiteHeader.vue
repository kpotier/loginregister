<script setup lang="ts">
import { ref } from "vue";
import SiteLogo from "./SiteLogo.vue";

const menuActive = ref(false);
const menuActiveFade = ref(false);

function menu() {
  menuActiveFade.value = true;
  menuActive.value = !menuActive.value;
  document.body.classList.toggle("is-clipped");
}

function menuClose() {
  if (menuActive.value) menu();
}

function menuFade() {
  menuActiveFade.value = false;
}
</script>

<template>
  <header id="header">
    <nav>
      <RouterLink :to="{ name: 'home' }" @click="menuClose">
        <SiteLogo />
      </RouterLink>
      <div class="menu mobile">
        <div class="elements">
          <button title="Synchroniser les comptes" class="element sync">
            <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
          </button>
          <button
            title="Menu"
            @click="menu"
            :class="{ active: menuActive }"
            class="element"
          >
            <font-awesome-icon icon="fa-solid fa-bars" />
          </button>
        </div>
      </div>
      <div
        class="menu"
        :class="{ active: menuActive, fade: menuActiveFade }"
        @transitionend="menuFade"
      >
        <div class="elements">
          <RouterLink to="/" class="element" @click="menuClose">
            Mes comptes
          </RouterLink>
          <RouterLink to="/objectives" class="element" @click="menuClose">
            Objectifs
          </RouterLink>
          <RouterLink to="/graphes" class="element" @click="menuClose">
            Évolution
          </RouterLink>
          <div class="icons">
            <button title="Synchroniser les comptes" class="element sync">
              <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
            </button>
            <RouterLink
              to="/settings"
              title="Paramètres"
              class="element"
              @click="menuClose"
            >
              <font-awesome-icon icon="fa-solid fa-gear" />
            </RouterLink>
            <RouterLink
              :to="{ name: 'authSignOut' }"
              title="Déconnexion"
              class="element"
              @click="menuClose"
            >
              <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/functions";
@import "@/assets/base/mixins";
@import "@/assets/base/extends";
@import "@/assets/elements/logo";

$nav-height: ($logo-height * 2);
$nav-padding: $padding;
$nav-padding-large: $padding-large;

header#header {
  background: var(--c-background);
  border-bottom: $border-width $border-style var(--c-border);
  height: $nav-height;
  position: sticky;
  top: 0;
  transition: background-color $transition, border-color $transition;
  width: 100%;
  z-index: 1;
}

#header {
  nav {
    display: flex;
    justify-content: space-between;
    margin: auto;
    max-width: $desktop;
    padding: 0 $nav-padding;
    padding-right: 0;
  }

  .menu.mobile {
    display: none;
    @include until($mobile) {
      display: inherit;
    }
  }

  .menu:not(.mobile) {
    @include until($mobile) {
      background-color: var(--c-background);
      bottom: 0;
      left: 0;
      opacity: 1;
      overflow-y: auto;
      position: fixed;
      right: 0;
      top: $nav-height;
      transform-origin: top;
      visibility: visible;

      &:not(.active) {
        opacity: 0;
        visibility: hidden;
      }

      &.fade {
        transition: opacity $transition, visibility $transition;
      }

      .elements {
        flex-direction: column;
        margin-top: 0%;
        padding: 0 $nav-padding;
      }

      &:not(.active) .elements {
        margin-top: -5%;
      }

      &.fade .elements {
        transition: margin-top $transition;
      }

      .element::after {
        left: 0%;
      }

      .icons .element::after {
        display: none;
      }

      .sync {
        display: none;
      }
    }
  }

  .elements {
    display: flex;

    .icons {
      display: flex;
      justify-content: center;
    }

    .element {
      @extend %control;

      align-items: center;
      cursor: pointer;
      display: flex;
      font-weight: $font-weight-bold;
      height: $nav-height;
      padding: 0 $nav-padding;
      position: relative;
      transition: color $transition;

      &::after {
        background-color: get-color("primary", 1);
        bottom: 0;
        content: "";
        height: $border-width;
        left: 50%;
        position: absolute;
        transition: left $transition, width $transition;
        width: 0%;
      }

      @mixin element-hover {
        color: get-color("primary", 1);

        &::after {
          left: 0;
          width: 100%;
        }
      }

      &.active,
      &.router-link-active {
        @include element-hover;
      }
      @media (hover: hover) {
        &:hover {
          @include element-hover;
        }
      }
    }
  }
}
</style>
