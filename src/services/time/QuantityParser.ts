import { injectable } from "inversify";

@injectable()
export class QuantityParser {
  private modifiers: { [key: string]: number } = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
  };

  public parse(quantity: string) {
    let amount = parseFloat(quantity);

    const modifiers = quantity.replace(/[0-9]/g, "").replace(/\./g, "");

    for (let mod of modifiers) {
      if (this.modifiers[mod]) {
        amount *= this.modifiers[mod];
      }
    }

    return amount;
  }
}
