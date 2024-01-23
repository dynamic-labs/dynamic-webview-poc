import { ChangeNotifier } from '../utils/ChangeNotifier';
import { WebViewOutboundEventEmitter } from './WebViewOutboundEventEmitter';

export class AuthModule extends ChangeNotifier {
  constructor(webViewOutboundEventEmitter: WebViewOutboundEventEmitter) {
    super();

    webViewOutboundEventEmitter.on('authTokenChanged', (token) => {
      this._token = token;

      this.notifyListeners();
    });
  }

  private _token: string | null = null;

  public get token(): string | null {
    return this._token;
  }
}
