import { Message } from "eris";
import { Command } from "../../structures/command/Command";

export class CoinflipCommand extends Command {
  aliases = ["cf"];

  async run(msg: Message) {
    const side = ["HEADS", "TAILS"][Math.floor(Math.random() * 2)];

    return await msg.channel.createMessage(
      this.locale.getLocale(`en`, `fun.COINFLIP_${side as `HEADS` | `TAILS`}`)
    );
  }
}