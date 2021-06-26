import { Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import { LocaleHandler } from "../../services/Locales";

export abstract class Command {
  readonly name: string = this.constructor.name
    .toLowerCase()
    .slice(0, -"Command".length);
  readonly aliases: string[] = [];

  readonly locale = container.get<LocaleHandler>(TYPES.LocaleHandler).getLocale;

  abstract run(message: Message, args: string[]): Promise<unknown>;
}
