import {
  Account,
  Address,
  Chain,
  Transport,
  WalletClient,
  createWalletClient,
} from 'viem';
import { createWebViewTransport } from '../utils/createWebViewTransport';
import type { Core } from '../client';

export class Wallet {
  constructor(
    private readonly core: Core,
    public readonly address: string,
    public readonly chain: string,
    public readonly connected: boolean
  ) {}

  get walletClient(): WalletClient<Transport, Chain, Account> {
    return createWalletClient({
      account: this.address as Address,
      transport: createWebViewTransport(this.address, this.core),
    });
  }

  static fromJson(
    core: Core,
    json: {
      address: string;
      chain: string;
      connected: boolean;
    }
  ) {
    return new Wallet(core, json.address, json.chain, json.connected);
  }
}
