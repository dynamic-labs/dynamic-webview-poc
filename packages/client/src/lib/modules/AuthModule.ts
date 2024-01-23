import { WebViewOutboundEventEmitter } from './WebViewOutboundEventEmitter';

export class AuthModule {
  constructor(webViewOutboundEventEmitter: WebViewOutboundEventEmitter) {
    webViewOutboundEventEmitter.on('authTokenChanged', (token) => {
      this._token = token;
    });
  }

  private _token: string | null = null;

  public get token(): string | null {
    return this._token;
  }
}
