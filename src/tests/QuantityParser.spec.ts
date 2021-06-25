import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { QuantityParser } from "../services/time/QuantityParser";

describe("Quantity Parser", () => {
  let service: QuantityParser;

  beforeEach(() => {
    service = new QuantityParser();
  });

  it(`Should correctly parse integer quantities.`, () => {
    expect(service.parse(`1120`)).to.equal(1120);
  });

  it(`Should correctly parse floating-point quantities.`, () => {
    expect(service.parse(`11.20`)).to.equal(11.2);
  });

  it(`Should correctly parse quantities with a single "thousand" symbol.`, () => {
    expect(service.parse(`11.20k`)).to.equal(11200);
  });

  it(`Should correctly parse quantities with a single "million" symbol.`, () => {
    expect(service.parse(`11.20m`)).to.equal(11200000);
  });

  it(`Should correctly parse quantities with a single "billion" symbol.`, () => {
    expect(service.parse(`11.20b`)).to.equal(11200000000);
  });

  it(`Should correctly parse quantities with a single "trillion" symbol.`, () => {
    expect(service.parse(`11.20t`)).to.equal(11200000000000);
  });

  it(`Should correctly parse quantities with multiple symbols.`, () => {
    expect(service.parse(`1120kk`)).to.equal(1120000000);
  });
});
