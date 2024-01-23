import EventEmitter from 'eventemitter3';
import { WebViewOutboundEventEmitter } from './modules/WebViewOutboundEventEmitter';
import { AuthModule } from './modules/AuthModule';
import { Extendable } from './utils/Extendable';
import { UserModule } from './modules/UserModule';
import { UserWalletsModule } from './modules/UserWalletsModule';

class Core {
  public webViewOutboundEventEmitter: WebViewOutboundEventEmitter =
    new EventEmitter();
}

class Client extends Extendable<Core> {
  public auth: AuthModule;
  public user: UserModule;
  public userWallets: UserWalletsModule;

  constructor(core: Core) {
    super(core);

    this.auth = new AuthModule(core.webViewOutboundEventEmitter);
    this.user = new UserModule(core.webViewOutboundEventEmitter);
    this.userWallets = new UserWalletsModule(core.webViewOutboundEventEmitter);
  }
}

export function createClient(): Client {
  const core = new Core();

  return new Client(core);
}
