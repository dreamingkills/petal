import { User } from "@prisma/client";
import { Client, Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import { Command } from "../../structures/command/Command";
import { Locale } from "../../types/locales";

export class PingCommand extends Command {
  aliases = ["pong"];

  async run(msg: Message, user: User) {
    const client = container.get<Client>(TYPES.Client);

    const guild = await client.getRESTGuild(msg.guildID!);
    const latency = guild.shard.latency;

    return await msg.channel.createMessage(
      this.locale.getLocale(user.locale as Locale, `general.PING`, { latency })
    );
  }
}
