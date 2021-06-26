import { Message } from "eris";
import { MessageEmbed } from "../../services/EmbedBuilder";
import { Command } from "../../structures/command/Command";

export class CoinflipCommand extends Command {
  aliases = ["cf", "coin"];

  async run(msg: Message) {
    const side = ["HEADS", "TAILS"][Math.floor(Math.random() * 2)] as
      | "HEADS"
      | "TAILS";

    const embed = new MessageEmbed(
      this.locale.getLocale("en", "fun.COINFLIP"),
      msg.author
    ).setDescription(
      `🪙 ${this.locale.getLocale("en", `fun.COINFLIP_${side}`)}`
    );

    return await msg.channel.createMessage({ embed });
  }
}
