export type TokenArgs = {
  key: string;
  value: string;
};

export class Token {
  public key: string;
  public value: string;

  constructor(args: TokenArgs) {
    this.key = args.key;
    this.value = args.value;
  }
}
