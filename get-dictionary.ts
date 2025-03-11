import "server-only"
import type { Locale } from "./i18n-config"

const dictionaries = {
  en: () => import("./messages/en.json").then((module) => module.default),
  pl: () => import("./messages/pl.json").then((module) => module.default),
  de: () => import("./messages/de.json").then((module) => module.default),
  fr: () => import("./messages/fr.json").then((module) => module.default),
  ja: () => import("./messages/ja.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

