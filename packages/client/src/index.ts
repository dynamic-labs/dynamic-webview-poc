import { createClient } from './lib/client';

export * from './lib/client';
export type { WebViewOutboundEvents } from './lib/modules/WebViewOutboundEventEmitter';
export type Client = ReturnType<typeof createClient>;
export { ChangeNotifier } from './lib/utils/ChangeNotifier';
