import { Component } from "react";

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

export class TokenComponent extends Component<{ token: Token }> {
  render() {
    const val = this.props.token.tokenValue;
    return (
      <span
        className="rounded-full px-2 align-middle m-1
       bg-blue-600
       hover:bg-blue-900"
      >
        {val}
      </span> 
    );
  }
}
