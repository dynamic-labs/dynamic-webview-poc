import { ChangeNotifier } from '../utils/ChangeNotifier';
import { WebViewOutboundEventEmitter } from './WebViewOutboundEventEmitter';

export class UserModule extends ChangeNotifier {
  constructor(webViewOutboundEventEmitter: WebViewOutboundEventEmitter) {
    super();

    webViewOutboundEventEmitter.on('userChanged', (user) => {
      this._user = user;

      this.notifyListeners();
    });
  }

  private _user: unknown | undefined;

  public get user(): unknown | unknown {
    return this._user;
  }
}
