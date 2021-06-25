import { Client } from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { CommandHandler } from "../services/CommandHandler";
import { Logger } from "../services/Logger";
import { MessageHandler } from "../services/MessageHandler";
import { DateFormatter } from "../services/time/DateFormatter";

@injectable()
export class Bot {
  private client: Client;
  private logger: Logger;
  private dateFormatter: DateFormatter;
  private commandHandler: CommandHandler;
  private messageHandler: MessageHandler;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Logger) logger: Logger,
    @inject(TYPES.DateFormatter) dateFormatter: DateFormatter,
    @inject(TYPES.CommandHandler) commandHandler: CommandHandler,
    @inject(TYPES.MessageHandler) messageHandler: MessageHandler
  ) {
    this.client = client;
    this.logger = logger;
    this.dateFormatter = dateFormatter;
    this.commandHandler = commandHandler;
    this.messageHandler = messageHandler;
  }

  public async listen(): Promise<void> {
    this.commandHandler.loadCommands();

    this.client.once(`ready`, async () => {
      this.logger.info(
        `Logged in as ${this.client.user.username}#${
          this.client.user.discriminator
        }. Current date: ${this.dateFormatter.formatCurrentDate({
          verbose: true,
          includeYear: true,
          ordinalIndicators: true,
        })}. Loaded ${this.commandHandler.getCommands().length} commands.`
      );
    });

    this.client.on(
      `messageCreate`,
      async (message) => await this.messageHandler.handleMessage(message)
    );

    return await this.client.connect();
  }
}
