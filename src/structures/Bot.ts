import { Client } from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/types";
import { CommandHandler } from "../services/CommandHandler";
import { Logger } from "../services/Logger";
import { MessageHandler } from "../services/MessageHandler";
import { DateFormatter } from "../services/time/DateFormatter";

@injectable()
export class Bot {
  @inject(TYPES.Client) private client!: Client;
  @inject(TYPES.Logger) private logger!: Logger;
  @inject(TYPES.DateFormatter) private dateFormatter!: DateFormatter;
  @inject(TYPES.CommandHandler) private commandHandler!: CommandHandler;
  @inject(TYPES.MessageHandler) private messageHandler!: MessageHandler;

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
