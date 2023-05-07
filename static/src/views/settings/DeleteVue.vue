<script lang="ts" setup>
import { ref } from "vue";
import InputPwd from "../../components/InputPwd.vue";
const inputPwd = ref("");
</script>

<template>
  <h2 class="subtitle">{{ $t("settings.delete") }}</h2>
  <h3 class="subsubtitle">{{ $t("settings.deleteSub") }}</h3>
  <form>
    <div class="field">
      <label for="oldPwd" class="label">{{ $t("settings.currentPwd") }}</label>
      <div class="control">
        <InputPwd
          id="oldPwd"
          v-model="inputPwd"
          placeholder="XXXXXXXXX"
          autocomplete="current-password"
          required
        ></InputPwd>
      </div>
    </div>
    <div class="field">
      <label
        for="confirm"
        class="label"
        v-html="$t('settings.deleteConfirm', { delete: '<b>DELETE</b>' })"
      ></label>
      <div class="control">
        <input
          id="confirm"
          type="text"
          class="input"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          autocorrect="off"
          required
        />
      </div>
    </div>
    <div class="field">
      <div class="control is-not-fullwidth">
        <button type="submit" class="input button is-large">
          {{ $t("settings.submitDelete") }}
        </button>
      </div>
    </div>
  </form>
</template>
