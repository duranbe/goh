export interface TokenInterface {
  startIndex: number;
  endIndex: number;
  tokenValue: string;
  id: number;
  toCSVFormat: () => string;
}

export class Token implements TokenInterface {
  startIndex: number;
  endIndex: number;
  tokenValue: string;
  id: number;

  constructor(
    startIndex: number,
    endIndex: number,
    tokenValue: string,
    id: number
  ) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.tokenValue = tokenValue;
    this.id = id;
  }

  toCSVFormat(): string {
    return String(
      `${this.id},${this.startIndex},${this.endIndex},${this.tokenValue}\n`
    );
  }
}
