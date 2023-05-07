<script lang="ts" setup>
import {
  pwdChecksDo,
  pwdChecks,
  PwdChecksState,
  pwdChecksReset,
} from "@/stores/passwordChecks";
import { ref } from "vue";
import InputPwd from "./InputPwd.vue";

const inputPwd = ref("");
const inputPwdAgain = ref("");

const iPwdErr = ref(false);
const iPwdAgainErr = ref(false);

pwdChecksReset();

function removeErr(e: Event) {
  if (e.target instanceof Element) e.target.classList.remove("is-danger");
}

function pwdChecksWhichIcon(s: PwdChecksState) {
  if (s === PwdChecksState.Info) return "fa-circle-info";
  if (s === PwdChecksState.Bad) return "fa-circle-xmark";
  return "fa-circle-check";
}

defineExpose({
  inputPwd,
  inputPwdAgain,
  iPwdErr,
  iPwdAgainErr,
});
</script>

<template>
  <div class="field">
    <label for="pwd" class="label">{{ $t("auth.pwd") }}</label>
    <InputPwd
      id="pwd"
      minlength="8"
      maxlength="72"
      v-model="inputPwd"
      placeholder="XXXXXXXXX"
      autocomplete="new-password"
      @input="pwdChecksDo(inputPwd)"
      :class="{ 'is-danger': iPwdErr }"
      @focus="removeErr"
      required
    />
    <div role="tooltip" class="help">
      <p class="is-gap-bigger">
        {{ $t("auth.pwdChecks.help") }}
      </p>
      <p
        class="password-check"
        v-for="(v, k) in pwdChecks"
        :key="k"
        :class="{
          'has-text-danger': v === PwdChecksState.Bad,
          'has-text-success': v === PwdChecksState.Good,
        }"
      >
        <font-awesome-icon :icon="['fa-solid', pwdChecksWhichIcon(v)]" />
        {{ $t("auth.pwdChecks." + k) }}
      </p>
    </div>
  </div>
  <div class="field">
    <label for="pwdAgain" class="label">{{ $t("auth.pwdAgain") }}</label>
    <InputPwd
      id="pwdAgain"
      v-model="inputPwdAgain"
      placeholder="XXXXXXXXX"
      autocomplete="new-password"
      :class="{ 'is-danger': iPwdAgainErr }"
      @focus="removeErr"
      required
    />
  </div>
</template>

<style lang="scss">
@import "@/assets/base/theme";

.password-check {
  color: var(--c-text);
  transition: color $transition;
}
</style>
