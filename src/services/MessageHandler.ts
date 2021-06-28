import {
  Client,
  Message,
  PossiblyUncachedTextableChannel,
  TextableChannel,
} from "eris";
import { inject, injectable } from "inversify";
import container from "../inversify/inversify.config";
import { TYPES } from "../inversify/types";
import { CommandHandler } from "./CommandHandler";
import Database from "./Database";

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

      const db = container.get<Database>(TYPES.Database);

      let user = await db.getUser(msg.author.id);

      if (user === null) {
        user = await db.createUser(msg.author.id);
      }

      // Check if the channel is a partial
      if (msg.channel.hasOwnProperty("name")) {
        return await command.run(msg as Message<TextableChannel>, user, args);
      } else {
        const channel = this.client.getChannel(
          msg.channel.id
        ) as TextableChannel;

        msg.channel = channel;

        return await command.run(msg as Message<TextableChannel>, user, args);
      }
    }
  }
}
