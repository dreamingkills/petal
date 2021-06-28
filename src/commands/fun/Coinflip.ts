import { User } from "@prisma/client";
import { Message } from "eris";
import { MessageEmbed } from "../../services/EmbedBuilder";
import { Command } from "../../structures/command/Command";
import { Locale } from "../../types/locales";

export class CoinflipCommand extends Command {
  aliases = ["cf", "coin"];

  async run(msg: Message, user: User) {
    const side = ["HEADS", "TAILS"][Math.floor(Math.random() * 2)] as
      | "HEADS"
      | "TAILS";

    const embed = new MessageEmbed(
      this.locale.getLocale(user.locale as Locale, "fun.COINFLIP"),
      msg.author
    ).setDescription(
      `🪙 ${this.locale.getLocale(
        user.locale as Locale,
        `fun.COINFLIP_${side}`
      )}`
    );

    return await msg.channel.createMessage({ embed });
  }
}
