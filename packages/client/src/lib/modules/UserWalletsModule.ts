import { Wallet } from '../classes/Wallet';
import { ChangeNotifier } from '../utils/ChangeNotifier';
import { WebViewOutboundEventEmitter } from './WebViewOutboundEventEmitter';

export class UserWalletsModule extends ChangeNotifier {
  private _wallets: Wallet[] = [];

  constructor(
    private readonly webViewOutboundEventEmitter: WebViewOutboundEventEmitter
  ) {
    super();

    this.initEventListener();
  }

  public get wallets() {
    return this._wallets;
  }

  private initEventListener() {
    this.webViewOutboundEventEmitter.on('userWalletsChanged', (wallets) => {
      this._wallets = wallets.map(Wallet.fromJson);

      this.notifyListeners();
    });
  }
}
