import { Wallet } from '../classes/Wallet';
import type { Core } from '../client';
import { ChangeNotifier } from '../utils/ChangeNotifier';

export class UserWalletsModule extends ChangeNotifier {
  private _wallets: Wallet[] = [];

  constructor(private readonly core: Core) {
    super();

    this.initEventListener();
  }

  public get wallets() {
    return this._wallets;
  }

  private initEventListener() {
    this.core.webViewOutboundEventEmitter.on(
      'userWalletsChanged',
      (wallets) => {
        this._wallets = wallets.map((json) => Wallet.fromJson(this.core, json));

        this.notifyListeners();
      }
    );
  }
}
