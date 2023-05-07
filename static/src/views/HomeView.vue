<script setup lang="ts">
import SiteHeader from "../components/SiteHeader.vue";
</script>

<template>
  <SiteHeader />
  <div id="home" class="container">
    <router-view></router-view>
  </div>
  <!--   <main class="container">
    <section class="left">
      <div class="column total">
        Total de mes avoirs
        <p>350 $</p>
      </div>
      <div class="column has-header">
        <div class="header">Mes comptes bancaires</div>
        <div class="main"></div>
      </div>
      <div class="column has-header">
        <div class="header">Mon épargne</div>
        <div class="main">content</div>
      </div>
      <div class="column has-header">
        <div class="header">Mes placements financiers</div>
        <div class="main">content</div>
      </div>
    </section>
    <section class="right">
      <div class="column">ddd</div>
    </section>
  </main> -->
</template>
<!-- 
<style lang="scss" scoped>
@import "@/assets/index";

main {
  display: flex;
  justify-content: center;

  section {
    width: 70%;
  }

  section.left {
    margin-right: $gap;
    width: 30%;
  }

  .column {
    &:not(.has-header) {
      border: $border-width $border-style var(--c-border);
      border-radius: $border-radius;
      padding: ($padding * 0.5) $padding;
    }
  }

  .column + .column {
    margin-top: $gap;
  }

  .header {
    background: get-color("primary", 1);
    border: $border-width $border-style get-color("primary", 1);
    border-radius: $border-radius $border-radius 0 0;
    color: get-color("primary", 3);
    font-weight: $font-weight-bold;
    padding: ($padding * 0.5) $padding;
  }

  .main {
    border: $border-width $border-style var(--c-border);
    border-radius: 0 0 $border-radius $border-radius;
    padding: ($padding * 0.5) $padding;
  }

  .total {
    text-align: center;

    p {
      color: get-color("primary", 1);
      font-size: $font-size-medium;
      font-weight: $font-weight-bold;
      margin-bottom: 0;
      margin-top: 0;
    }
  }
}
</style>
 -->
