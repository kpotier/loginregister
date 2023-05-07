<script lang="ts" setup>
import MakePwd from "@/components/MakePwd.vue";
import { ref } from "vue";
import InputPwd from "../../components/InputPwd.vue";
import { authStore } from "@/stores/auth";
const as = authStore();

const inputPwd = ref("");
</script>

<template>
  <h2 class="subtitle">{{ $t("settings.pwd") }}</h2>
  <h3 class="subsubtitle">{{ $t("settings.pwdSub") }}</h3>
  <form>
    <div class="field">
      <label for="email" class="label">{{ $t("auth.email") }}</label>
      <div class="control">
        <input
          id="email"
          type="email"
          class="input"
          disabled="true"
          autocomplete="email"
          :value="as.user?.user?.email"
        />
      </div>
    </div>
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
    <MakePwd></MakePwd>
    <div class="field">
      <div class="control is-not-fullwidth">
        <button type="submit" class="input button is-large">
          {{ $t("settings.submitChange") }}
        </button>
      </div>
    </div>
  </form>
</template>
