<script lang="ts">
interface params extends ComponentPublicInstance {
  allowed: boolean;
  internalErr: boolean;
}
export default {
  data() {
    return {
      allowed: false,
      internalErr: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      to.params["inviteCode"] !== undefined &&
      to.params["email"] !== undefined
    ) {
      next((vm) => {
        const v = vm as params;
        v.allowed = true;
      });
      return;
    }
    authStore().checkSignUp((res) => {
      next((vm) => {
        const v = vm as params;
        if (res.internalErr) v.internalErr = true;
        else if (res.allowed) v.allowed = true;
      });
    });
  },
};
</script>

<script lang="ts" setup>
import {
  ref,
  shallowRef,
  type ComponentPublicInstance,
  type Ref,
  type ShallowRef,
} from "vue";
import { authStore } from "@/stores/auth";
import SlideAnimation from "@/components/SlideAnimation.vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  pwdChecksReset,
  pwdChecks,
  PwdChecksState,
} from "@/stores/passwordChecks";
import { Config } from "@/config";
import MakePwd from "../../components/MakePwd.vue";

const as = authStore();
const t = useI18n();
const r = useRoute();
const rtr = useRouter();

pwdChecksReset();

const signUpVerify = ref(false);
const verifyResendNow = ref(new Date());
const verifyResend = ref(new Date());
let timer = 0;

const makePwd: Ref<InstanceType<typeof MakePwd> | undefined> = ref(undefined);

// Input elements. Email is disabled if the user has an invite code.
const inputInviteCode =
  r.params["invite"] !== undefined ? r.params["invite"].toString() : " ";
const inputEmail = ref(
  r.params["email"] !== undefined ? r.params["email"].toString() : ""
);
const inputVerifyCode = ref("");

// Elements that will be used to display error/success messages.
const iEmailDisabled = r.params["email"] !== undefined ? true : false;
const iSubmitLoading = ref(false);
const msgErr: ShallowRef<{
  err?: string;
  success?: string;
}> = shallowRef({});
const iEmailErr = ref(false);
const iVerifyCodeErr = ref(false);

// Submit first part
function submit(e: Event) {
  e.preventDefault();
  if (!makePwd.value) return;
  submitBefore();

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

  as.verifySignUp(inputEmail.value, t.locale.value, inputInviteCode, (res) => {
    switch (true) {
      case res.ok: {
        const d = new Date();
        d.setSeconds(d.getSeconds() + Config.codeResend);
        verifyResend.value = d;
        signUpVerify.value = true;
        inputVerifyCode.value = "";
        startTimer();
        msgErr.value = { success: "auth.verifySignUpOK" };
        break;
      }
      case res.inviteCodeErr:
        msgErr.value = { err: "auth.inviteCodeErr" };
        break;
      case res.emailErr:
        signUpVerify.value = false;
        msgErr.value = { err: "auth.emailErr" };
        iEmailErr.value = true;
        break;
      case res.internalErr:
        msgErr.value = { err: "auth.internalErr" };
        break;
    }
    return submitAfter();
  });
}

// Submit second part
function submitVerify(e: Event) {
  e.preventDefault();
  if (!makePwd.value) return;
  submitBefore();

  as.signUp(
    inputEmail.value,
    makePwd.value.inputPwd,
    t.locale.value,
    inputInviteCode,
    inputVerifyCode.value,
    (res) => {
      if (!makePwd.value) return submitAfter();
      switch (true) {
        case res.ok:
          rtr.push({ name: "home" });
          break;
        case res.pwdErr:
          signUpVerify.value = false;
          makePwd.value.iPwdErr = true;
          makePwd.value.iPwdAgainErr = true;
          msgErr.value = { err: "auth.badPwdErr" };
          break;
        case res.inviteCodeErr:
          msgErr.value = { err: "auth.inviteCodeErr" };
          break;
        case res.verifyCodeErr:
          iVerifyCodeErr.value = true;
          msgErr.value = { err: "auth.verifyCodeErr" };
          break;
        case res.internalErr:
          msgErr.value = { err: "auth.internalErr" };
          break;
      }
      return submitAfter();
    }
  );
  return;
}

function submitGlobal(e: Event) {
  e.preventDefault();
  if (signUpVerify.value) submitVerify(e);
  else submit(e);
}
// Misc
function submitBefore() {
  if (iSubmitLoading.value || !makePwd.value) return;
  iSubmitLoading.value = true;
  iEmailErr.value = false;
  makePwd.value.iPwdErr = false;
  makePwd.value.iPwdAgainErr = false;
  iVerifyCodeErr.value = false;
}

function submitAfter() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  iSubmitLoading.value = false;
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
  <h1 class="title">{{ $t("auth.signUp") }}</h1>
  <h2 class="subtitle">{{ $t("auth.signUpSub") }}</h2>
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
  <form v-if="allowed" @submit="submitGlobal">
    <div v-show="!signUpVerify">
      <div class="field">
        <label for="email" class="label">{{ $t("auth.email") }}</label>
        <div class="control">
          <input
            id="email"
            type="email"
            class="input"
            autocomplete="email"
            placeholder="harold.finch@octan.com"
            v-model="inputEmail"
            required
            :disabled="iEmailDisabled"
            :class="{ 'is-danger': iEmailErr }"
            @focus="removeErr"
          />
        </div>
      </div>
      <MakePwd ref="makePwd"></MakePwd>
      <div class="field">
        <div class="control is-not-fullwidth">
          <button
            type="submit"
            class="input button is-large"
            :class="{ 'is-loading': iSubmitLoading }"
            :disabled="iSubmitLoading"
          >
            {{ $t("auth.submitSignUp") }}
          </button>
        </div>
      </div>
      <p class="field">
        <RouterLink :to="{ name: 'authSignIn' }">{{
          $t("auth.signInLink")
        }}</RouterLink>
      </p>
    </div>
    <div v-if="signUpVerify">
      <div class="field">
        <label for="verifyCode" class="label">{{
          $t("auth.verifyCode")
        }}</label>
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
            {{ $t("auth.submitSignUp") }}
          </button>
        </div>
      </div>
      <p class="field">
        <a href="#" @click.prevent="signUpVerify = !signUpVerify">{{
          $t("auth.goBackLink")
        }}</a>
      </p>
    </div>
  </form>
  <div v-else>
    <div class="notification is-danger">
      {{
        internalErr ? $t("auth.internalErr") : $t("auth.signUpNotAllowedErr")
      }}
    </div>
    <p class="field">
      <RouterLink :to="{ name: 'authSignIn' }">{{
        $t("auth.signInLink")
      }}</RouterLink>
    </p>
  </div>
</template>
