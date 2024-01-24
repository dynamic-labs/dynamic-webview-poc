import EventEmitter from 'eventemitter3';
import { WebViewOutboundEventEmitter } from './modules/WebViewOutboundEventEmitter';
import { AuthModule } from './modules/AuthModule';
import { Extendable } from './utils/Extendable';
import { UserModule } from './modules/UserModule';
import { UserWalletsModule } from './modules/UserWalletsModule';
import { WebViewInboundEventEmitter } from './modules/WebViewInboundEventEmitter';

export class Core {
  public webViewOutboundEventEmitter: WebViewOutboundEventEmitter =
    new EventEmitter();

  public webViewInboundEventEmitter: WebViewInboundEventEmitter =
    new WebViewInboundEventEmitter();
}

class Client extends Extendable<Core> {
  public auth: AuthModule;
  public user: UserModule;
  public userWallets: UserWalletsModule;

  constructor(core: Core) {
    super(core);

    this.auth = new AuthModule(core.webViewOutboundEventEmitter);
    this.user = new UserModule(core.webViewOutboundEventEmitter);
    this.userWallets = new UserWalletsModule(core);
  }
}

export function createClient(): Client {
  const core = new Core();

  return new Client(core);
}
