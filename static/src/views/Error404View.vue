<template>
  <div id="error" class="container">
    <div>
      <h1 class="title">{{ $t("err.404.0") }}</h1>
      <h2 class="subtitle">
        {{ $t("err.404.1") }}
      </h2>
      <div class="field">
        <div class="control is-not-fullwidth">
          <button
            type="submit"
            class="input button is-large"
            @click.prevent="$router.push({ name: 'home' })"
          >
            {{ $t("err.404.2") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/base/theme";
@import "@/assets/base/mixins";

#error.container {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  @include until($mobile) {
    min-height: auto;
    padding: $padding-large !important;
  }
}
</style>
