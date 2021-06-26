import { Message } from "eris";
import container from "../../inversify/inversify.config";
import { TYPES } from "../../inversify/types";
import { CommandHandler } from "../../services/CommandHandler";
import { Command } from "../../structures/command/Command";

export class HelpCommand extends Command {
  async run(msg: Message, args: string[]) {
    const commandHandler = container.get<CommandHandler>(TYPES.CommandHandler);

    const commands = commandHandler.getCommands();

    if (args.length === 0) {
      return await msg.channel.createMessage(this.renderHelpCenter(commands));
    }

    const commandName = args[0].toLowerCase();

    const findCommand = commands.find(
      (c) => c.name === commandName || c.aliases.includes(commandName)
    );

    if (!findCommand) {
      return await msg.channel.createMessage(this.renderHelpCenter(commands));
    }

    return await msg.channel.createMessage(this.renderCommandHelp(findCommand));
  }

  private renderHelpCenter(commands: Command[]) {
    return commands.map((c) => c.name).join(`, `);
  }

  private renderCommandHelp(command: Command) {
    return (
      `**${command.name}**` +
      `\nAliases: ${command.aliases.join(`, `) || `None`}`
    );
  }
}
