import { Client, Message } from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { MessageResponder } from "../services/discord/MessageResponder";

@injectable()
export class Bot {
  private client: Client;
  private messageResponder: MessageResponder;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder
  ) {
    this.client = client;
    this.messageResponder = messageResponder;
  }

  public async listen(): Promise<void> {
    this.client.on(`messageCreate`, async (message) => {
      if (message.author.bot) return;

      await this.messageResponder.handle(message as Message);
    });

    return await this.client.connect();
  }
}
