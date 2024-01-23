import EventEmitter from 'eventemitter3';

export type WebViewOutboundEvents = {
  authTokenChanged: (token: string | null) => void;
};

export type WebViewOutboundEventEmitter = EventEmitter<WebViewOutboundEvents>;
