import { User } from "@prisma/client";
import { Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import Database from "../../services/Database";
import { Command } from "../../structures/command/Command";
import { Locale } from "../../types/locales";

export class SetLocaleCommand extends Command {
  async run(msg: Message, user: User, args: string[]) {
    const locale = args[0]?.toLowerCase();

    const valid = this.locale.isValidLocale(locale);

    if (!valid) {
      return await msg.channel.createMessage(
        this.locale.getLocale(user.locale as Locale, `general.INVALID_LOCALE`, {
          loc: locale,
        })
      );
    }

    const db = container.get<Database>(TYPES.Database);

    await db.updateUser(user, { locale: locale as Locale });

    const flag = this.locale.getFlag(locale as Locale);
    const name = this.locale.getName(locale as Locale);

    return await msg.channel.createMessage(
      this.locale.getLocale(
        locale as Locale,
        `command.SETLOCALE_LOCALE_UPDATED`,
        { flag, name }
      )
    );
  }
}
