import enUS from "@/locales/en-US.json";
import type { IntlDateTimeFormat } from "vue-i18n";

const datetimeFormats: { [x: string]: IntlDateTimeFormat } = {
  "en-US": {
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
    shortTime: {
      hour: "numeric",
      minute: "numeric",
    },
    minutes: {
      minute: "numeric",
      second: "numeric",
    },
  },
  "fr-FR": {
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
    shortTime: {
      hour: "numeric",
      minute: "numeric",
    },
    minutes: {
      minute: "numeric",
      second: "numeric",
    },
  },
};

export const Config = {
  basePath: "/api",
  codeResend: 2 * 60,

  locale: {
    supported: ["en-US", "fr-FR"],
    default: "en-US",
    fallback: <Record<string, string | undefined>>{ fr: "fr-FR", en: "en-US" },
    defaultMsg: { "en-US": enUS },
    datetimeFormats: datetimeFormats,
  },
};
