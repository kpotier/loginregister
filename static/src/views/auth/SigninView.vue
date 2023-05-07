<script lang="ts" setup>
import router from "@/router";
import { authStore } from "@/stores/auth";
import { ref, type Ref } from "vue";
import SlideAnimation from "../../components/SlideAnimation.vue";
import InputPwd from "../../components/InputPwd.vue";

const as = authStore();

const inputEmail = ref("");
const inputPwd = ref("");
const msgErr: Ref<string | undefined> = ref(undefined);

const iErr = ref(false);
const iSubmitLoading = ref(false);

async function submit(e: Event) {
  e.preventDefault();
  iSubmitLoading.value = true;
  iErr.value = false;
  as.signIn(inputEmail.value, inputPwd.value, (res) => {
    switch (true) {
      case res.Logged:
        router.push(as.redirectTo);
        break;
      case res.BadCredentials:
        msgErr.value = "auth.badEmailPwdErr";
        iErr.value = true;
        break;
      case res.Internal:
        msgErr.value = "auth.internalErr";
        break;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    iSubmitLoading.value = false;
  });
}

function removeErr(e: Event) {
  if (e.target instanceof Element) e.target.classList.remove("is-danger");
}
</script>

<template>
  <h1 class="title">{{ $t("auth.signIn") }}</h1>
  <h2 class="subtitle">{{ $t("auth.signInSub") }}</h2>
  <SlideAnimation>
    <div v-if="msgErr !== undefined">
      <div class="notification is-danger" aria-live="polite">
        {{ $t(msgErr) }}
      </div>
    </div>
  </SlideAnimation>
  <form @submit="submit">
    <div class="field">
      <label for="email" class="label">{{ $t("auth.email") }}</label>
      <div class="control">
        <input
          id="email"
          type="email"
          class="input"
          placeholder="harold.finch@octan.com"
          autocomplete="email"
          v-model="inputEmail"
          :class="{ 'is-danger': iErr }"
          @focus="removeErr"
          required
        />
      </div>
    </div>
    <div class="field">
      <label for="pwd" class="label">{{ $t("auth.pwd") }}</label>
      <InputPwd
        id="pwd"
        v-model="inputPwd"
        placeholder="XXXXXXXXX"
        autocomplete="current-password"
        :class="{ 'is-danger': iErr }"
        @focus="removeErr"
        required
      />
      <div class="help" style="text-align: right">
        <RouterLink :to="{ name: 'authResetPwd' }">
          {{ $t("auth.resetPwdLink") }}
        </RouterLink>
      </div>
    </div>
    <div class="field">
      <div class="control is-not-fullwidth">
        <button
          type="submit"
          class="input button is-large"
          :disabled="iSubmitLoading"
          :class="{ 'is-loading': iSubmitLoading }"
        >
          {{ $t("auth.submitSignIn") }}
        </button>
      </div>
    </div>
    <p class="field">
      <RouterLink :to="{ name: 'authSignUp' }">{{
        $t("auth.signUpLink")
      }}</RouterLink>
    </p>
  </form>
</template>
