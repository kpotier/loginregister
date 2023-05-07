<script lang="ts" setup>
import SlideAnimation from "@/components/SlideAnimation.vue";
import { authStore } from "@/stores/auth";
import { ref, shallowRef, type ShallowRef } from "vue";
import { useI18n } from "vue-i18n";

const as = authStore();
const t = useI18n();

const inputEmail = ref("");

const verify = ref(false);
const verifyResendNow = ref(new Date());
const verifyResend = ref(new Date());

const msgErr: ShallowRef<{
  err?: string;
  success?: string;
}> = shallowRef({});

function submit(e: Event) {
  e.preventDefault();

  as.SetEmailInvite(inputEmail.value, t.locale.value, (res) => {
    if (res.ok) {
      verify.value = true;
    } else if (res.internal) {
      msgErr.value = { err: "auth.internalErr" };
    }
  });
}
</script>

<template>
  <h2 class="subtitle">{{ $t("settings.email") }}</h2>
  <h3 class="subsubtitle">{{ $t("settings.emailSub") }}</h3>
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
  <form @submit="submit">
    <div v-if="!verify">
      <div class="field">
        <label for="email" class="label">{{ $t("auth.email") }}</label>
        <div class="control">
          <input
            id="email"
            type="email"
            class="input"
            autocomplete="email"
            v-model="inputEmail"
            required
            :value="as.user?.user?.email"
          />
        </div>
      </div>
      <div class="field">
        <div class="control is-not-fullwidth">
          <button type="submit" class="input button is-large">
            {{ $t("settings.submitChange") }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
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
            required
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
          <button type="submit" class="input button is-large">
            {{ $t("settings.submitChange") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
