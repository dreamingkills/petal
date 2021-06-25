import { Message } from "eris";
import { inject, injectable } from "inversify";
import { TYPES } from "../../inversify/types";
import { ResponseFinder } from "./ResponseFinder";

@injectable()
export class MessageResponder {
  private responseFinder: ResponseFinder;

  constructor(@inject(TYPES.ResponseFinder) responseFinder: ResponseFinder) {
    this.responseFinder = responseFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    const response = this.responseFinder.getResponse(message.content);

    if (response) {
      return message.channel.createMessage(
        response.replace(`$u`, `<@${message.author.id}>`)
      );
    }

    return Promise.reject();
  }
}
