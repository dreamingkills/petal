import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { LocaleHandler } from "../services/Locales";

describe(`Locales`, () => {
  let service: LocaleHandler;

  beforeEach(() => {
    service = new LocaleHandler();
  });

  it(`Should correctly localize with variables.`, () => {
    expect(service.getLocale(`en`, `general.PING`, { name: `Test` })).to.equal(
      `Hello, Test!`
    );
  });

  it(`Should correctly localize English.`, () => {
    expect(service.getLocale(`en`, `general.PING`)).to.equal(`Hello, $name!`);
  });

  it(`Should correctly localize Korean.`, () => {
    expect(service.getLocale(`ko`, `general.PING`)).to.equal(
      `안녕하세요, $name!`
    );
  });

  it(`Should correctly fallback to English if a translation does not exist.`, () => {
    expect(service.getLocale(`ko`, `debug.ENGLISH_ONLY_PHRASE`)).to.equal(
      `This phrase only exists in English!`
    );
  });

  it(`Should correctly fallback to error phrase if the fallback fails.`, () => {
    // @ts-ignore - have to ignore this so that it intentionally fails work
    expect(service.getLocale(`ko`, `general.NONEXISTENT_TRANSLATION`)).to.equal(
      `This text is untranslated, and a fallback could not be achieved.`
    );
  });
});
