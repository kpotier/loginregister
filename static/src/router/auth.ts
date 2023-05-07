import AuthSigninVue from "@/views/auth/SigninView.vue";
import AuthSignupVue from "@/views/auth/SignupView.vue";
import AuthLayoutVue from "@/views/auth/LayoutView.vue";
import AuthSignoutVue from "@/views/auth/SignoutView.vue";
import ResetPwdVueVue from "@/views/auth/ResetPwdVue.vue";

export default {
  path: "/auth",
  component: AuthLayoutVue,
  redirect: { name: "authSignIn" },
  children: [
    {
      name: "authSignIn",
      path: "sign-in",
      component: AuthSigninVue,
    },
    {
      name: "authSignUp",
      path: "sign-up",
      component: AuthSignupVue,
    },
    {
      path: "sign-up/invite/:inviteCode/:email",
      component: AuthSignupVue,
    },
    {
      name: "authResetPwd",
      path: "reset-pwd",
      component: ResetPwdVueVue,
    },
    {
      name: "authSignOut",
      path: "sign-out",
      component: AuthSignoutVue,
      meta: { requiresAuth: true },
    },
  ],
  meta: { requiresAuth: false },
};
