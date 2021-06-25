import { Message } from "eris";
import { injectable } from "inversify";
import { ResponseFinder } from "./ResponseFinder";

@injectable()
export class MessageResponder {
  private responseFinder = new ResponseFinder();

  async handle(message: Message): Promise<void> {
    const response = this.responseFinder.getResponse(message.content);

    if (response) {
      message.channel.createMessage(
        response.replace(`$u`, `<@${message.author.id}>`)
      );
    }

    return;
  }
}
