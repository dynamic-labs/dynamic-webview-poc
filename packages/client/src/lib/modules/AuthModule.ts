import type { Core } from '../client';
import { ChangeNotifier } from '../utils/ChangeNotifier';

export class AuthModule extends ChangeNotifier {
  constructor(private readonly core: Core) {
    super();

    this.initEventListeners();
  }

  private _token: string | null = null;

  public get token(): string | null {
    return this._token;
  }

  public open(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      let user: unknown = null;

      this.core.webViewInboundEventEmitter.send('setShowAuthFlow', true);

      this.core.webViewOutboundEventEmitter.on('userChanged', (u) => {
        user = u;
      });

      this.core.webViewOutboundEventEmitter.on(
        'showAuthFlowChanged',
        (showAuthFlow) => {
          if (showAuthFlow) return;

          if (user) {
            resolve(user);
          } else {
            reject();
          }

          return;
        }
      );
    });
  }

  public logout() {
    this.core.webViewInboundEventEmitter.send('logout');
  }

  private initEventListeners() {
    this.core.webViewOutboundEventEmitter.on('authTokenChanged', (token) => {
      this._token = token;

      this.notifyListeners();
    });
  }
}
