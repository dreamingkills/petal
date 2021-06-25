import { Client, Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import { LocaleHandler } from "../../services/Locales";
import { Bot } from "../Bot";

export abstract class Command {
  name: string = this.constructor.name
    .toLowerCase()
    .slice(0, -"Command".length);
  aliases: string[] = [];

  client = container.get<Client>(TYPES.Client);
  bot = container.get<Bot>(TYPES.Bot);
  locale = container.get<LocaleHandler>(TYPES.LocaleHandler);

  abstract run(message: Message): Promise<unknown>;
}
