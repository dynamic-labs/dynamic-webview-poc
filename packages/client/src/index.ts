import { createClient } from './lib/client';

export * from './lib/client';
export type { WebViewOutboundEvents } from './lib/modules/WebViewOutboundEventEmitter';
export type Client = ReturnType<typeof createClient>;
