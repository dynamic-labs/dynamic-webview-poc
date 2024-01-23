import EventEmitter from 'eventemitter3';

export type WebViewOutboundEvents = {
  authTokenChanged: (token: string | null) => void;
  userChanged: (user: unknown) => void;
};

export type WebViewOutboundEventEmitter = EventEmitter<WebViewOutboundEvents>;
