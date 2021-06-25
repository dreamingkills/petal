import { injectable } from "inversify";
import { format } from "date-fns";

@injectable()
export class DateFormatter {
  public formatDate(date: Date, options?: DateOptions): string {
    let formatString = ``;

    if (options?.verbose) {
      formatString += `MMMM `;

      if (options.ordinalIndicators) {
        formatString += `do`;
      } else {
        formatString += `d`;
      }

      if (options.includeYear) formatString += `, uuuu`;
    } else {
      if (options?.includeYear) formatString += `uuuu/`;

      formatString += `MM/dd`;
    }

    return format(date, formatString);
  }

  public formatCurrentDate(options?: DateOptions): string {
    return this.formatDate(new Date(), options);
  }
}

type DateOptions = {
  includeYear?: boolean;
  ordinalIndicators?: boolean;
  verbose?: boolean;
};
