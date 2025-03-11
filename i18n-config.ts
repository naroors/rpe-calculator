export const i18n = {
  defaultLocale: "en",
  locales: ["en", "pl", "de", "fr", "ja"],
} as const

export type Locale = (typeof i18n)["locales"][number]

