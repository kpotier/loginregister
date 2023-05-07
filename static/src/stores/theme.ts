import { defineStore } from "pinia";
import {
  computed,
  nextTick,
  ref,
  type Ref,
  type WritableComputedRef,
} from "vue";

const localStorageKey = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

export enum Theme {
  Dark = "dark",
  Light = "light",
}

const ThemeAuto = "auto";

export const themeStore = defineStore("themeStore", () => {
  const themeRef: Ref<Theme> = ref(Theme.Light);
  const theme: WritableComputedRef<Theme> = computed({
    get() {
      return themeRef.value;
    },
    set(value) {
      setTheme(value);
    },
  });

  function init() {
    const t = localStorage.getItem(localStorageKey);
    if (t !== null && [Theme.Dark, Theme.Light].includes(<Theme>t))
      setTheme(<Theme>t, true);
    else if (media.matches) setTheme(Theme.Dark);
    else setTheme(Theme.Light);
    media.onchange = (e) => {
      if (e.matches) setTheme(Theme.Dark, true);
      else setTheme(Theme.Light, true);
    };
    return nextTick();
  }

  function setTheme(t: Theme, browser = false): void {
    if (!browser) {
      let tStore: string = t;
      if (t === Theme.Dark && media.matches) tStore = ThemeAuto;
      else if (t === Theme.Light && !media.matches) tStore = ThemeAuto;
      localStorage.setItem(localStorageKey, tStore);
    }
    themeRef.value = t;
    if (t === Theme.Dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  function toggleTheme(): void {
    if (theme.value == Theme.Dark) setTheme(Theme.Light);
    else setTheme(Theme.Dark);
  }

  return { theme, setTheme, toggleTheme, init };
});
