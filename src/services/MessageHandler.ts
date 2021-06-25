import {
  Message,
  PossiblyUncachedTextableChannel,
  TextableChannel,
} from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { CommandHandler } from "./CommandHandler";

@injectable()
export class MessageHandler {
  private commandHandler: CommandHandler;

  constructor(@inject(TYPES.CommandHandler) commandHandler: CommandHandler) {
    this.commandHandler = commandHandler;
  }

  public async handleMessage(msg: Message<PossiblyUncachedTextableChannel>) {
    if (msg.author.bot) return;

    if (msg.content.startsWith(process.env.DEFAULT_PREFIX || `.`)) {
      const commandName = msg.content
        .split(` `)[0]
        .slice((process.env.DEFAULT_PREFIX || `.`).length)
        .toLowerCase();

      const command = this.commandHandler.getCommand(commandName);

      if (!command) return;

      // Check if the channel is a partial
      if (msg.channel.hasOwnProperty("name")) {
        return await command.run(msg as Message<TextableChannel>);
      } else {
        const channel = command.client.getChannel(
          msg.channel.id
        ) as TextableChannel;

        msg.channel = channel;

        return await command.run(msg as Message<TextableChannel>);
      }
    }
  }
}
