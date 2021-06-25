import type * as en from "../locales/en.json";

export type LocaleString =
  | `EMOJI`
  | `NAME`
  | `general.${keyof typeof en.general}`
  | `debug.${keyof typeof en.debug}`;
