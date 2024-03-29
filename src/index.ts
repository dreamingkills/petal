require(`dotenv`).config();
import container from "./inversify/inversify.config";
import { TYPES } from "./inversify/types";
import { Bot } from "./structures/Bot";

let bot = container.get<Bot>(TYPES.Bot);

bot.listen().catch((error) => {
  console.log(`Oh no! ${error}`);
});
