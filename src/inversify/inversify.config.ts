import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "../structures/Bot";
import { Client } from "eris";
import { DateFormatter } from "../services/time/DateFormatter";
import { Logger } from "../services/Logger";
import { CommandHandler } from "../services/CommandHandler";
import { MessageHandler } from "../services/MessageHandler";
import { LocaleHandler } from "../services/Locales";
import { QuantityParser } from "../services/time/QuantityParser";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container
  .bind<Client>(TYPES.Client)
  .toConstantValue(
    new Client(process.env.TOKEN || `Invalid Token`, { restMode: true })
  );
container
  .bind<DateFormatter>(TYPES.DateFormatter)
  .to(DateFormatter)
  .inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
container
  .bind<CommandHandler>(TYPES.CommandHandler)
  .to(CommandHandler)
  .inSingletonScope();
container
  .bind<MessageHandler>(TYPES.MessageHandler)
  .to(MessageHandler)
  .inSingletonScope();
container
  .bind<LocaleHandler>(TYPES.LocaleHandler)
  .to(LocaleHandler)
  .inSingletonScope();
container
  .bind<QuantityParser>(TYPES.QuantityParser)
  .to(QuantityParser)
  .inSingletonScope();

export default container;
