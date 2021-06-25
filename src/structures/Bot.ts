import { Client, Message } from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { MessageResponder } from "../services/discord/MessageResponder";
import { Logger } from "../services/Logger";
import { DateFormatter } from "../services/time/DateFormatter";

@injectable()
export class Bot {
  private client: Client;
  private messageResponder: MessageResponder;
  private logger: Logger;
  private dateFormatter: DateFormatter;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder,
    @inject(TYPES.Logger) logger: Logger,
    @inject(TYPES.DateFormatter) dateFormatter: DateFormatter
  ) {
    this.client = client;
    this.messageResponder = messageResponder;
    this.logger = logger;
    this.dateFormatter = dateFormatter;
  }

  public async listen(): Promise<void> {
    this.client.once(`ready`, () => {
      this.logger.info(
        `Logged in as ${this.client.user.username}#${
          this.client.user.discriminator
        }. Current date: ${this.dateFormatter.formatCurrentDate({
          verbose: true,
          includeYear: true,
          ordinalIndicators: true,
        })}.`
      );
    });

    this.client.on(`messageCreate`, async (message) => {
      if (message.author.bot) return;

      await this.messageResponder.handle(message as Message);
    });

    return await this.client.connect();
  }
}
