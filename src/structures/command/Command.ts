import { Client, Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";

export abstract class Command {
  name: string = this.constructor.name
    .toLowerCase()
    .slice(0, -"Command".length);
  aliases: string[] = [];

  client = container.get<Client>(TYPES.Client);

  abstract run(message: Message): Promise<unknown>;
}
