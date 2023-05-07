<template>
  <div id="logo">
    <img alt="Vue logo" src="@/assets/logo.svg" />
    Banking
  </div>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/extends";
@import "@/assets/elements/logo";

#logo {
  @extend %unselectable;

  align-items: center;
  color: var(--c-text);
  display: flex;
  font-size: $logo-font-size;
  font-weight: $font-weight-bold;
  height: 100%;
  letter-spacing: 0.3px;
  transition: opacity $transition, color $transition;

  &:hover {
    opacity: 0.6;
  }

  > img {
    height: $logo-height;
    margin-right: 0.3rem;
  }
}
</style>
