import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { ResponseFinder } from "../services/discord/ResponseFinder";

describe("Response Finder", () => {
  let service: ResponseFinder;

  beforeEach(() => {
    service = new ResponseFinder();
  });

  it('Should find a valid response for "Hi, Petal!"', () => {
    expect(service.getResponse("Hi, Petal!")).to.equal("Hey there, $u!");
  });
});
