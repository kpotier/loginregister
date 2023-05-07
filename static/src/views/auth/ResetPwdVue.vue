<script lang="ts" setup>
import { Config } from "@/config";
import { authStore } from "@/stores/auth";
import { shallowRef, ref, type ShallowRef, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import SlideAnimation from "../../components/SlideAnimation.vue";
import MakePwd from "../../components/MakePwd.vue";
import {
  pwdChecks,
  pwdChecksReset,
  PwdChecksState,
} from "@/stores/passwordChecks";
import { useRouter } from "vue-router";

const as = authStore();
const t = useI18n();
const rtr = useRouter();

const resetStep = ref(0);
const verifyResendNow = ref(new Date());
const verifyResend = ref(new Date());
let timer = 0;

const makePwd: Ref<InstanceType<typeof MakePwd> | undefined> = ref(undefined);

const inputEmail = ref("");
const inputVerifyCode = ref("");
const iEmailErr = ref(false);
const iSubmitLoading = ref(false);
const iVerifyCodeErr = ref(false);

const msgErr: ShallowRef<{
  err?: string;
  success?: string;
}> = shallowRef({});

function reset() {
  if (!makePwd.value) return;
  makePwd.value.iPwdAgainErr = false;
  makePwd.value.iPwdErr = false;

  iSubmitLoading.value = true;
  iEmailErr.value = false;
  iVerifyCodeErr.value = false;
}

function submit(e: Event) {
  e.preventDefault();
  reset();
  as.verifyResetPwd(inputEmail.value, t.locale.value, (res) => {
    switch (true) {
      case res.ok: {
        const d = new Date();
        d.setSeconds(d.getSeconds() + Config.codeResend);
        verifyResend.value = d;
        resetStep.value = 1;
        inputVerifyCode.value = "";
        startTimer();
        msgErr.value = { success: "auth.verifySignUpOK" };
        break;
      }
      case res.emailErr:
        resetStep.value = 0;
        msgErr.value = { err: "auth.emailErr" };
        iEmailErr.value = true;
        break;
      case res.internalErr:
        msgErr.value = { err: "auth.internalErr" };
        break;
    }
    submitAfter();
  });
}

function submitStep1(e: Event) {
  e.preventDefault();
  reset();
  as.checkResetPwd(inputEmail.value, inputVerifyCode.value, (res) => {
    switch (true) {
      case res.ok: {
        resetStep.value = 2;
        pwdChecksReset();
        if (makePwd.value) {
          makePwd.value.inputPwd = "";
          makePwd.value.inputPwdAgain = "";
        }
        msgErr.value = {};
        break;
      }
      case res.verifyCodeErr:
        msgErr.value = { err: "auth.verifyCodeErr" };
        iVerifyCodeErr.value = true;
        break;
      case res.internalErr:
        msgErr.value = { err: "auth.internalErr" };
        break;
    }
    submitAfter();
  });
}

function submitAfter() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  iSubmitLoading.value = false;
}

function submitStep2(e: Event) {
  e.preventDefault();
  if (!makePwd.value) return;
  reset();

  // Check password
  const checks = pwdChecks.value;
  for (const k in checks) {
    const v = (checks as Record<string, PwdChecksState>)[k];
    if (v !== PwdChecksState.Good) {
      msgErr.value = { err: "auth.badPwdErr" };
      makePwd.value.iPwdErr = true;
      makePwd.value.iPwdAgainErr = true;
      return submitAfter();
    }
  }

  if (makePwd.value.inputPwd !== makePwd.value.inputPwdAgain) {
    msgErr.value = { err: "auth.badPwdAgainErr" };
    makePwd.value.iPwdAgainErr = true;
    return submitAfter();
  }

  as.resetPwd(
    inputVerifyCode.value,
    inputEmail.value,
    makePwd.value?.inputPwd,
    (res) => {
      if (makePwd.value)
        switch (true) {
          case res.ok: {
            rtr.push({ name: "home" });
            break;
          }
          case res.pwdErr: {
            makePwd.value.iPwdErr = true;
            makePwd.value.iPwdAgainErr = true;
            msgErr.value = { err: "auth.badPwdErr" };
            break;
          }
          case res.verifyCodeErr: {
            msgErr.value = { err: "auth.verifyCodeErr" };
            break;
          }
          case res.internalErr: {
            msgErr.value = { err: "auth.internalErr" };
            break;
          }
        }
      iSubmitLoading.value = false;
    }
  );
}

function removeErr(e: Event) {
  if (e.target instanceof Element) e.target.classList.remove("is-danger");
}

function startTimer() {
  clearInterval(timer);
  verifyResendNow.value = new Date();
  timer = setInterval(() => {
    if (verifyResend.value <= verifyResendNow.value) {
      verifyResendNow.value = verifyResend.value;
      clearInterval(timer);
      return;
    }
    verifyResendNow.value = new Date();
  }, 1000);
}
</script>

<template>
  <h1 class="title">{{ $t("auth.pwdReset") }}</h1>
  <h2 class="subtitle">{{ $t("auth.pwdResetSub") }}</h2>
  <SlideAnimation>
    <div v-if="msgErr.err !== undefined || msgErr.success !== undefined">
      <div
        class="notification"
        :class="{ 'is-success': msgErr.success, 'is-danger': msgErr.err }"
        aria-live="polite"
      >
        {{
          $t(
            msgErr.err !== undefined
              ? msgErr.err
              : msgErr.success !== undefined
              ? msgErr.success
              : ""
          )
        }}
      </div>
    </div>
  </SlideAnimation>
  <form @submit="submit" v-show="resetStep === 0">
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
          :class="{ 'is-danger': iEmailErr }"
          @focus="removeErr"
          required
        />
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
          {{ $t("auth.submitPwdReset") }}
        </button>
      </div>
    </div>
    <p class="field">
      <RouterLink :to="{ name: 'authSignIn' }">{{
        $t("auth.signInLink")
      }}</RouterLink>
    </p>
  </form>
  <form @submit="submitStep1" v-show="resetStep === 1">
    <div class="field">
      <label for="verifyCode" class="label">{{ $t("auth.verifyCode") }}</label>
      <div class="control">
        <input
          id="verifyCode"
          type="text"
          class="input"
          placeholder="XXXXXXXXX"
          autocomplete="one-time-code"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="off"
          v-model="inputVerifyCode"
          required
          :class="{ 'is-danger': iVerifyCodeErr }"
          @focus="removeErr"
        />
      </div>
      <div class="help">
        <p style="text-align: right">
          <button
            type="button"
            @click="submit"
            class="styleless-input resend"
            :disabled="verifyResend.getTime() - verifyResendNow.getTime() > 0"
          >
            {{ $t("auth.verifyCodeLink") }}
            <span
              v-show="verifyResend.getTime() - verifyResendNow.getTime() > 0"
            >
              ({{
                $d(
                  verifyResend.getTime() - verifyResendNow.getTime(),
                  "minutes"
                )
              }})
            </span>
          </button>
        </p>
      </div>
    </div>
    <div class="field">
      <div class="control is-not-fullwidth">
        <button
          type="submit"
          class="input button is-large"
          :class="{ 'is-loading': iSubmitLoading }"
          :disabled="iSubmitLoading"
        >
          {{ $t("auth.submitPwdReset") }}
        </button>
      </div>
    </div>
    <p class="field">
      <a href="#" @click.prevent="resetStep = 0">{{ $t("auth.goBackLink") }}</a>
    </p>
  </form>
  <form @submit="submitStep2" v-show="resetStep === 2" name="register">
    <div class="field">
      <label for="email" class="label">{{ $t("auth.email") }}</label>
      <div class="control">
        <input
          id="email"
          type="email"
          class="input"
          disabled="true"
          autocomplete="email"
          :value="inputEmail"
        />
      </div>
    </div>
    <MakePwd ref="makePwd"></MakePwd>
    <div class="field">
      <div class="control is-not-fullwidth">
        <button
          type="submit"
          class="input button is-large"
          :disabled="iSubmitLoading"
          :class="{ 'is-loading': iSubmitLoading }"
        >
          {{ $t("auth.submitPwdReset") }}
        </button>
      </div>
    </div>
    <p class="field">
      <a href="#" @click.prevent="resetStep = 1">{{ $t("auth.goBackLink") }}</a>
    </p>
  </form>
</template>
