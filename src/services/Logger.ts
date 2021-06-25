import { injectable } from "inversify";
import winston = require("winston");

@injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    winston.addColors({
      error: `red`,
      debug: `blue`,
      warn: `yellow`,
      data: `grey`,
      info: `green`,
      verbose: `cyan`,
    });

    this.logger = winston.createLogger({
      levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
      },
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [new winston.transports.Console()],
    });
  }

  public error(text: string) {
    return this.logger.error(text);
  }

  public debug(text: string) {
    return this.logger.debug(text);
  }

  public warn(text: string) {
    return this.logger.warn(text);
  }

  public data(text: string) {
    return this.logger.data(text);
  }

  public info(text: string) {
    return this.logger.info(text);
  }

  public verbose(text: string) {
    return this.logger.verbose(text);
  }
}
