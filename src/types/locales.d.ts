import type * as en from "../locales/en.json";

export type Locale = `en` | `ko`;

export type LocaleString =
  | `EMOJI`
  | `NAME`
  | `general.${keyof typeof en.general}`
  | `fun.${keyof typeof en.fun}`
  | `debug.${keyof typeof en.debug}`
  | `command.${keyof typeof en.command}`;
