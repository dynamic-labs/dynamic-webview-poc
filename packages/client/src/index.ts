import { createClient } from './lib/client';
import 'fast-text-encoding';

export * from './lib/client';
export type Client = ReturnType<typeof createClient>;
export { ChangeNotifier } from './lib/utils/ChangeNotifier';
export { Wallet } from './lib/classes/Wallet';

export type {
  WebViewOutboundEvents,
  WebViewOutboundEventEmitter,
} from './lib/modules/WebViewOutboundEventEmitter';

export type {
  WebViewInboundEventEmitter,
  WebViewInboundEvents,
} from './lib/modules/WebViewInboundEventEmitter';
