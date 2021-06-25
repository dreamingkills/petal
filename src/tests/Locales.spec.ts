import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { LocaleHandler } from "../services/Locales";

describe(`Locales`, () => {
  let service: LocaleHandler;

  beforeEach(() => {
    service = new LocaleHandler();
  });

  it(`Should correctly localize with variables`, () => {
    expect(service.getLocale(`en`, `general.PING`, { name: `Test` })).to.equal(
      `Hello, Test!`
    );
  });

  it(`Should correctly localize English`, () => {
    expect(service.getLocale(`en`, `general.PING`)).to.equal(`Hello, $name!`);
  });

  it(`Should correctly localize Korean`, () => {
    expect(service.getLocale(`ko`, `general.PING`)).to.equal(
      `안녕하세여, $name!`
    );
  });
});
