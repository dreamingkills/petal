export class ResponseFinder {
  private responses = new Map([["hi, petal!", "Hey there, $u!"]]);

  public getResponse(str: string): string | undefined {
    return this.responses.get(str.toLowerCase());
  }
}
