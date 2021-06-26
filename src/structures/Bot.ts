import Eris, { Client } from "eris";
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

    Object.defineProperty(Eris.User.prototype, "tag", {
      enumerable: false,
      get: function () {
        return `${this.username}#${this.discriminator}`;
      },
    });

    this.client.once(`ready`, async () => {
      this.logger.info(
        `Logged in as ${
          this.client.user.tag
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
