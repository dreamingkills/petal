import { fdir } from "fdir";
import { readFileSync } from "fs";
import { injectable } from "inversify";
import path from "path";
import { LocaleString } from "../types/locales";

@injectable()
export class LocaleHandler {
  locales: Map<string, { [key: string]: { [key: string]: string } }>;

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
        [filePath.split(`\\`).length - 1].slice(0, -`.json`.length);

      this.locales.set(languageCode, data);
    }
  }

  public getLocale(
    locale: `en` | `ko`,
    fieldName: LocaleString,
    args?: { [key: string]: string }
  ): string {
    const fetchLocale = this.locales.get(locale);

    if (!fetchLocale) return "";

    const [category, term] = fieldName.split(`.`);

    let localizedString = fetchLocale[category][term];

    if (args) {
      for (let arg of Object.entries(args)) {
        localizedString = localizedString.replace(
          new RegExp(`\\$${arg[0]}`, "g"),
          arg[1]
        );
      }
    }

    return localizedString;
  }
}
