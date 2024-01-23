import EventEmitter from 'eventemitter3';
import { WebViewOutboundEventEmitter } from './modules/WebViewOutboundEventEmitter';
import { AuthModule } from './modules/AuthModule';
import { Extendable } from './utils/Extendable';

class Core {
  public webViewOutboundEventEmitter: WebViewOutboundEventEmitter =
    new EventEmitter();
}

class Client extends Extendable<Core> {
  public auth: AuthModule;

  constructor(core: Core) {
    super(core);

    this.auth = new AuthModule(core.webViewOutboundEventEmitter);
  }
}

export function createClient(): Client {
  const core = new Core();

  return new Client(core);
}
