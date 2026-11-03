import path from "node:path";
import { fileURLToPath } from "node:url";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import * as middleware from "i18next-http-middleware";

const localesDir = path.dirname(fileURLToPath(import.meta.url));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "az"],
    preload: ["en", "az"],
    load: "languageOnly",
    ns: ["validation", "fields", "auth"],
    defaultNS: "validation",
    initAsync: false,
    backend: {
      loadPath: path.join(localesDir, "locales", "{{lng}}", "{{ns}}.json"),
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      caches: ["cookie"],
    },
  });

export { i18next, middleware };
