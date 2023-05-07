import { shallowRef } from "vue";
import { isDigit, isUpper, isLower, isPunct, isSymbol } from "@/utils/unicode";

export enum PwdChecksState {
  Info = 1,
  Good,
  Bad,
}

const init = {
  "8runes": PwdChecksState.Info,
  "1lower": PwdChecksState.Info,
  "1upper": PwdChecksState.Info,
  "1digit": PwdChecksState.Info,
  "1special": PwdChecksState.Info,
};

export const pwdChecks = shallowRef(init);

export function pwdChecksReset() {
  pwdChecks.value = init;
}

export function pwdChecksDo(p: string) {
  const pwd = [...p];
  const checks = { ...pwdChecks.value };
  Object.keys(checks).forEach((k) => {
    (checks as Record<string, PwdChecksState>)[k] = PwdChecksState.Bad;
  });
  if (pwd.length >= 8) checks["8runes"] = PwdChecksState.Good;
  for (const c of pwd) {
    switch (true) {
      case isDigit(c):
        checks["1digit"] = PwdChecksState.Good;
        break;
      case isUpper(c):
        checks["1upper"] = PwdChecksState.Good;
        break;
      case isLower(c):
        checks["1lower"] = PwdChecksState.Good;
        break;
      case isPunct(c) || isSymbol(c):
        checks["1special"] = PwdChecksState.Good;
        break;
    }
  }
  pwdChecks.value = checks;
}
