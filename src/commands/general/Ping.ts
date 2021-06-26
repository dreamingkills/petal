import { Client, Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import { Command } from "../../structures/command/Command";

export class PingCommand extends Command {
  aliases = ["pong"];

  async run(msg: Message) {
    const client = container.get<Client>(TYPES.Client);

    const guild = await client.getRESTGuild(msg.guildID!);
    const latency = guild.shard.latency;

    return await msg.channel.createMessage(
      this.locale.getLocale(`en`, `general.PING`, { latency })
    );
  }
}
