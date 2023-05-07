import { defineStore } from "pinia";
import { AuthApi, type AuthSignInResponse } from "banking_api";
import type { RpcStatus } from "banking_api";
import jwt_decode, { type JwtPayload } from "jwt-decode";
import { Config } from "../config";
import { ref, type Ref } from "vue";
import isJSON from "../utils/api";
import { I18nGlobal, setI18nLocale } from "@/i18n";
import type { Composer } from "vue-i18n";

export const authStore = defineStore("authStore", () => {
  const redirectTo = ref("/");
  const user: Ref<AuthSignInResponse | undefined> = ref(undefined);
  const api = new AuthApi(undefined, Config.basePath);
  let refreshExpire: number;
  let accessExpire: number;

  function store(u: AuthSignInResponse): boolean {
    if (!u.accessToken || !u.refreshToken || !u.refreshToken.exp) {
      logout();
      return false;
    }

    const jwt: JwtPayload = jwt_decode(u.accessToken);
    if (!jwt.exp) {
      logout();
      return false;
    }

    accessExpire = jwt.exp * 1000;
    refreshExpire = new Date(u.refreshToken.exp).getTime();
    user.value = u;
    localStorage.setItem("u", JSON.stringify(u));
    if (user.value.user?.locale)
      setI18nLocale(I18nGlobal.global as Composer, user.value.user.locale);
    return true;
  }

  function logout() {
    localStorage.removeItem("u");
    user.value = undefined;
    refreshExpire = 0;
    accessExpire = 0;
  }

  async function isLoggedIn(): Promise<boolean> {
    if (!user.value) {
      const u = localStorage.getItem("u");
      if (!u) return false;
      store(JSON.parse(u) as AuthSignInResponse);
      if (!user.value) return false;
    }

    // Time window of 10s.
    const window = 10 * 1000;
    const currentTime = new Date().getTime();

    if (refreshExpire - currentTime <= window) {
      // TODO: alert indicating that the session is expired
      logout();
      return false;
    }

    if (accessExpire - currentTime <= window) {
      try {
        const value = await newAccess();
        if (!isJSON(value.headers) || !value.data.accessToken) {
          logout();
          // TODO: alert indicating that the session is expired
          return false;
        }
        user.value.accessToken = value.data.accessToken;
        store(user.value);
        if (!user.value || accessExpire - currentTime <= window) {
          // TODO: alert indicating that the session is expired
          logout();
          return false;
        }
        return true;
      } catch (err) {
        // TODO: alert indicating that the session is expired
        logout();
        return false;
      }
    }

    return true;
  }

  function newAccess() {
    return api.authNewAccess({ refreshToken: user.value?.refreshToken });
  }

  function signIn(
    email: string,
    password: string,
    cb: (r: {
      Logged?: boolean;
      Internal?: boolean;
      BadCredentials?: boolean;
    }) => void
  ) {
    api
      .authSignIn({ email: email, pwd: password })
      .then((value) => {
        if (!isJSON(value.headers)) return cb({ Internal: true });
        if (store(value.data)) return cb({ Logged: true });
        else return cb({ Internal: true });
      })
      .catch((error) => {
        if (error.response && isJSON(error.response.headers)) {
          const rpc = <RpcStatus>error.response.data;
          if (rpc.code === 3) return cb({ BadCredentials: true });
        }
        return cb({ Internal: true });
      });
  }

  function checkSignUp(
    cb: (res: { allowed?: boolean; internalErr?: boolean }) => void
  ) {
    api
      .authCheckSignUp()
      .then((res) => {
        if (isJSON(res.headers) && res.data.allowed !== undefined)
          return cb({ allowed: res.data.allowed });
        return cb({ internalErr: true });
      })
      .catch(() => {
        return cb({ internalErr: true });
      });
  }

  function verifySignUp(
    email: string,
    locale: string,
    inviteCode: string,
    cb: (res: {
      ok?: boolean;
      emailErr?: boolean;
      inviteCodeErr?: boolean;
      internalErr?: boolean;
    }) => void
  ) {
    api
      .authVerifySignUp({ email: email, locale: locale }, inviteCode)
      .then((res) => {
        if (!isJSON(res.headers)) return cb({ internalErr: true });
        return cb({ ok: true });
      })
      .catch((err) => {
        if (err.response && isJSON(err.response.headers)) {
          const rpc = <RpcStatus>err.response.data;
          if (rpc.code === 3) {
            if (rpc.details !== undefined)
              for (const elem of rpc.details) {
                if (elem["reason"] === "CODE_INVITE")
                  return cb({ inviteCodeErr: true });
              }
            return cb({ emailErr: true });
          }
        }
        return cb({ internalErr: true });
      });
  }

  function signUp(
    email: string,
    pwd: string,
    locale: string,
    inviteCode: string,
    verifyCode: string,
    cb: (res: {
      ok?: boolean;
      pwdErr?: boolean;
      inviteCodeErr?: boolean;
      verifyCodeErr?: boolean;
      internalErr?: boolean;
    }) => void
  ) {
    api
      .authSignUp(
        { email: email, pwd: pwd, locale: locale, verifyCode: verifyCode },
        inviteCode
      )
      .then((res) => {
        if (!isJSON(res.headers)) return cb({ internalErr: true });
        if (store(res.data)) return cb({ ok: true });
        else return cb({ internalErr: true });
      })
      .catch((err) => {
        if (err.response && isJSON(err.response.headers)) {
          const rpc = <RpcStatus>err.response.data;
          if (rpc.code === 3) {
            if (rpc.details !== undefined)
              for (const element of rpc.details) {
                if (element["reason"] === "CODE_INVITE")
                  return cb({ inviteCodeErr: true });
                else if (
                  element["reason"] === "CODE_VERIFY" ||
                  element["reason"] === "CODE_RESETPWD"
                )
                  return cb({ verifyCodeErr: true });
              }
            return cb({ pwdErr: true });
          }
        }
        return cb({ internalErr: true });
      });
  }

  function verifyResetPwd(
    email: string,
    locale: string,
    cb: (res: {
      ok?: boolean;
      emailErr?: boolean;
      internalErr?: boolean;
    }) => void
  ) {
    api
      .authVerifyResetPwd({ email: email, locale: locale })
      .then((res) => {
        if (!isJSON(res.headers)) return cb({ internalErr: true });
        return cb({ ok: true });
      })
      .catch((err) => {
        if (err.response && isJSON(err.response.headers)) {
          const rpc = <RpcStatus>err.response.data;
          if (rpc.code === 3) return cb({ emailErr: true });
        }
        return cb({ internalErr: true });
      });
  }

  function checkResetPwd(
    email: string,
    verifyCode: string,
    cb: (res: {
      ok?: boolean;
      verifyCodeErr?: boolean;
      internalErr?: boolean;
    }) => void
  ) {
    api
      .authCheckResetPwd({ verifyCode: verifyCode, email: email })
      .then((res) => {
        if (!isJSON(res.headers)) return cb({ internalErr: true });
        return cb({ ok: true });
      })
      .catch((err) => {
        if (err.response && isJSON(err.response.headers)) {
          const rpc = <RpcStatus>err.response.data;
          if (rpc.code === 3 && rpc.details !== undefined)
            for (const element of rpc.details)
              if (element["reason"] === "CODE_RESETPWD")
                return cb({ verifyCodeErr: true });
        }
        return cb({ internalErr: true });
      });
  }

  function resetPwd(
    verifyCode: string,
    email: string,
    pwd: string,
    cb: (res: {
      ok?: boolean;
      verifyCodeErr?: boolean;
      pwdErr?: boolean;
      internalErr?: boolean;
    }) => void
  ) {
    api
      .authResetPwd({ verifyCode: verifyCode, email: email, pwd: pwd })
      .then((res) => {
        if (!isJSON(res.headers)) return cb({ internalErr: true });
        if (store(res.data)) return cb({ ok: true });
        else return cb({ internalErr: true });
      })
      .catch((err) => {
        if (err.response && isJSON(err.response.headers)) {
          const rpc = <RpcStatus>err.response.data;
          if (rpc.code === 3) {
            if (rpc.details !== undefined)
              for (const element of rpc.details)
                if (element["reason"] === "CODE_RESETPWD")
                  return cb({ verifyCodeErr: true });
            return cb({ pwdErr: true });
          }
        }
        return cb({ internalErr: true });
      });
  }

  function setLocale(
    locale: string,
    cb: (res: { ok?: boolean; internal?: boolean }) => void
  ) {
    isLoggedIn().then((loggedIn) => {
      if (!loggedIn) return cb({ internal: true });
      api
        .authSetLocale(
          { locale: locale },
          { headers: { Authorization: user.value?.accessToken } }
        )
        .then((res) => {
          if (!isJSON(res.headers)) return cb({ internal: true });
          return cb({ ok: true });
        })
        .catch(() => {
          return cb({ internal: true });
        });
    });
  }

  function SetEmailInvite(
    email: string,
    locale: string,
    cb: (res: { ok?: boolean; internal?: boolean }) => void
  ) {
    isLoggedIn().then((loggedIn) => {
      if (!loggedIn) return cb({ internal: true });
      api
        .authSetEmailInvite(
          { email: email, locale: locale },
          { headers: { Authorization: user.value?.accessToken } }
        )
        .then((res) => {
          if (!isJSON(res.headers)) return cb({ internal: true });
          return cb({ ok: true });
        })
        .catch(() => {
          return cb({ internal: true });
        });
    });
  }

  return {
    logout,
    store,
    isLoggedIn,
    signIn,
    checkSignUp,
    verifySignUp,
    signUp,
    verifyResetPwd,
    checkResetPwd,
    resetPwd,
    setLocale,
    SetEmailInvite,
    user,
    redirectTo,
  };
});
