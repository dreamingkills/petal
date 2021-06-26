import {
  Client,
  Message,
  PossiblyUncachedTextableChannel,
  TextableChannel,
} from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { CommandHandler } from "./CommandHandler";

@injectable()
export class MessageHandler {
  @inject(TYPES.CommandHandler) private commandHandler!: CommandHandler;
  @inject(TYPES.Client) private client!: Client;

  public async handleMessage(msg: Message<PossiblyUncachedTextableChannel>) {
    if (msg.author.bot) return;

    if (msg.content.startsWith(process.env.DEFAULT_PREFIX || `.`)) {
      const commandName = msg.content
        .split(` `)[0]
        .slice((process.env.DEFAULT_PREFIX || `.`).length)
        .toLowerCase();

      const command = this.commandHandler.getCommand(commandName);

      if (!command) return;

      const args = msg.content.split(` `).slice(1);

      // Check if the channel is a partial
      if (msg.channel.hasOwnProperty("name")) {
        return await command.run(msg as Message<TextableChannel>, args);
      } else {
        const channel = this.client.getChannel(
          msg.channel.id
        ) as TextableChannel;

        msg.channel = channel;

        return await command.run(msg as Message<TextableChannel>, args);
      }
    }
  }
}
