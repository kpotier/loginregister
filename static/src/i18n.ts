import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

import type { I18n, I18nOptions, Locale, Composer } from "vue-i18n";
import { Config } from "@/config";

const localeStorageKey = "locale";

export function setupI18n(): I18n {
  const options: I18nOptions = {
    legacy: false,
    locale: Config.locale.default,
    fallbackLocale: Config.locale.default,
    messages: Config.locale.defaultMsg,
    datetimeFormats: Config.locale.datetimeFormats,
  };
  const i18n = createI18n(options);

  return i18n;
}

export const I18nGlobal = setupI18n();

export function initI18nLocale(i18n: Composer): Promise<void> {
  // We read and set the user defined locale.
  const userLocale: Locale[] = [];
  const storageLocale = localStorage.getItem(localeStorageKey);
  if (storageLocale !== null) {
    userLocale.push(storageLocale);
  }
  if (navigator.languages && navigator.languages.length) {
    userLocale.push(...navigator.languages.slice());
  } else {
    userLocale.push(navigator.language);
  }
  return setI18nLocale(i18n, ...userLocale);
}

export function setI18nLocale(
  i18n: Composer,
  ...locales: Locale[]
): Promise<void> {
  let localeSet: Locale | undefined = undefined;
  for (const l of locales) {
    // Is this locale supported?
    if (Config.locale.supported.includes(l)) {
      localeSet = l;
      break;
    }

    // Check fallback
    const fallback = Config.locale.fallback[l];
    if (fallback !== undefined) {
      localeSet = fallback;
      break;
    }
  }

  // Still nothing? Set default language.
  if (localeSet === undefined) {
    localeSet = Config.locale.default;
  }

  i18n.locale.value = localeSet;
  document.querySelector("html")?.setAttribute("lang", localeSet);
  localStorage.setItem(localeStorageKey, localeSet);
  return loadLocaleMessages(i18n, localeSet);
}

export async function loadLocaleMessages(
  i18n: Composer,
  locale: Locale
): Promise<void> {
  const messages = await import(`@/locales/${locale}.json`);
  i18n.setLocaleMessage(locale, messages);
  return nextTick();
}
