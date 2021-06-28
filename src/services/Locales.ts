import { fdir } from "fdir";
import { readFileSync } from "fs";
import { injectable } from "inversify";
import path from "path";
import { Locale, LocaleString } from "../types/locales";

@injectable()
export class LocaleHandler {
  locales: Map<Locale, { [key: string]: { [key: string]: string } }>;

  constructor() {
    this.locales = new Map();
    this.updateLocales();
  }

  public updateLocales() {
    const localeFiles = new fdir()
      .glob(`**/*`)
      .withFullPaths()
      .crawl(path.join(__dirname, `../locales`))
      .sync() as string[];

    for (const filePath of localeFiles) {
      const file = readFileSync(filePath, { encoding: `utf-8` });

      const data = JSON.parse(file);

      const languageCode = filePath
        .split(`\\`)
        [filePath.split(`\\`).length - 1].slice(0, -`.json`.length) as Locale;

      this.locales.set(languageCode, data);
    }
  }

  public getLocale(
    locale: Locale,
    fieldName: LocaleString,
    args?: { [key: string]: string | number }
  ): string {
    const fetchLocale = this.locales.get(locale);

    if (!fetchLocale) return "";

    const [category, term] = fieldName.split(`.`);

    let localizedString = fetchLocale[category]?.[term];

    if (!localizedString) {
      const fallback = this.locales.get(`en`)?.[category][term];

      if (fallback) {
        localizedString = fallback;
      } else
        localizedString = `This text is untranslated, and a fallback could not be achieved.`;
    }

    if (args) {
      for (let arg of Object.entries(args)) {
        localizedString = localizedString.replace(
          new RegExp(`\\$${arg[0]}`, "g"),
          arg[1].toString()
        );
      }
    }

    return localizedString;
  }

  public getFlag(localeCode: Locale) {
    const locale = this.locales.get(localeCode);

    return (locale?.["EMOJI"] as unknown as string) || `❔`;
  }

  public getName(localeCode: Locale) {
    const locale = this.locales.get(localeCode);

    return (locale?.["NAME"] as unknown as string) || `Unknown (Unknown)`;
  }

  public isValidLocale(localeCode: string) {
    // Enforcing localeCode to be typed as Locale here is kind of weird.
    const locale = this.locales.get(localeCode as Locale);

    if (!locale) return false;

    return true;
  }

  public isValidLocaleKey(localeCode: Locale, fieldName: LocaleString) {
    const locale = this.locales.get(localeCode);

    if (!locale) return false;

    const [category, term] = fieldName.split(`.`);

    return !!locale[category]?.[term];
  }
}
