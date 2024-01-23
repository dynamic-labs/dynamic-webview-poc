export class Wallet {
  constructor(
    public readonly address: string,
    public readonly chain: string,
    public readonly connected: boolean
  ) {}

  static fromJson(json: {
    address: string;
    chain: string;
    connected: boolean;
  }) {
    return new Wallet(json.address, json.chain, json.connected);
  }
}
