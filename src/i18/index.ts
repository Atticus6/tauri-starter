import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from "./en.json";
import translation_zh from "./zh.json";
export const defaultNS = "" as const;

export const resources = {
  en: { translation: translation_en },
  zh: { translation: translation_zh },
} as const;
i18n.use(initReactI18next).init({
  resources,
  // 默认语言  zh/en  中文/英文
  lng: "zh",

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
