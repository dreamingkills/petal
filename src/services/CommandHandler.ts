import { fdir } from "fdir";
import { inject, injectable } from "inversify";
import path from "path";
import { TYPES } from "../inversify/types";
import { Command } from "../structures/command/Command";
import { Logger } from "./Logger";

@injectable()
export class CommandHandler {
  private commands: Command[] = [];
  private logger: Logger;

  constructor(@inject(TYPES.Logger) logger: Logger) {
    this.logger = logger;
  }

  public loadCommands() {
    const files = new fdir()
      .glob(`**/*.js`)
      .withFullPaths()
      .crawl(path.join(__dirname, `../commands`))
      .sync() as string[];

    for (const file of files) {
      if (!file.endsWith(`.js`)) continue;

      let command;

      try {
        const importedCommand = require(file);
        command = importedCommand[Object.keys(importedCommand)[0]];

        this.commands.push(new command() as Command);
      } catch (e) {
        this.logger.error(`Error loading command from ${file}\n${e}`);
      }
    }
  }

  public getCommand(name: string): Command | undefined {
    return this.commands.find(
      (c) =>
        c.name === name.toLowerCase() || c.aliases.includes(name.toLowerCase())
    );
  }

  public getCommands(): Command[] {
    return this.commands;
  }
}
