import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { DateFormatter } from "../services/time/DateFormatter";

describe(`Date Formatter`, () => {
  let service: DateFormatter;

  beforeEach(() => {
    service = new DateFormatter();
  });

  it("Should correctly format verbose dates with years and ordinal indicators.", () => {
    expect(
      service.formatDate(new Date(`September 20, 2003`), {
        includeYear: true,
        ordinalIndicators: true,
        verbose: true,
      })
    ).to.equal(`September 20th, 2003`);
  });

  it("Should correctly format verbose dates with years and without ordinal indicators.", () => {
    expect(
      service.formatDate(new Date(`November 20, 2002`), {
        includeYear: true,
        verbose: true,
      })
    ).to.equal(`November 20, 2002`);
  });

  it("Should correctly format verbose dates without years and with ordinal indicators.", () => {
    expect(
      service.formatDate(new Date(`November 22, 2020`), {
        verbose: true,
        ordinalIndicators: true,
      })
    ).to.equal(`November 22nd`);
  });

  it("Should correctly format verbose dates without years or ordinal indicators.", () => {
    expect(
      service.formatDate(new Date(`September 6, 2020`), { verbose: true })
    ).to.equal(`September 6`);
  });

  it("Should correctly format non-verbose dates with years.", () => {
    expect(
      service.formatDate(new Date(`June 18, 2021`), { includeYear: true })
    ).to.equal(`2021/06/18`);
  });

  it("Should correctly format non-verbose dates without years.", () => {
    expect(service.formatDate(new Date(`December 20, 2020`))).to.equal(`12/20`);
  });
});
