import { Message } from "eris";
import { Command } from "../../structures/command/Command";

export class PingCommand extends Command {
  aliases = ["pong"];

  async run(msg: Message) {
    return await msg.channel.createMessage(
      `en: ${this.locale.getLocale(`en`, `general.PING`, {
        name: msg.author.username,
      })}\nko: ${this.locale.getLocale(`ko`, `general.PING`, {
        name: msg.author.username,
      })}`
    );
  }
}
