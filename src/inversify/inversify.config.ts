import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "../structures/Bot";
import { Client } from "eris";
import { MessageResponder } from "../services/discord/MessageResponder";
import { ResponseFinder } from "../services/discord/ResponseFinder";
import { DateFormatter } from "../services/time/DateFormatter";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container
  .bind<Client>(TYPES.Client)
  .toConstantValue(new Client(process.env.TOKEN || `Invalid Token`));
container
  .bind<MessageResponder>(TYPES.MessageResponder)
  .to(MessageResponder)
  .inSingletonScope();
container
  .bind<ResponseFinder>(TYPES.ResponseFinder)
  .to(ResponseFinder)
  .inSingletonScope();
container
  .bind<DateFormatter>(TYPES.DateFormatter)
  .to(DateFormatter)
  .inSingletonScope();

export default container;
