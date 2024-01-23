import EventEmitter from 'eventemitter3';

export type WebViewOutboundEvents = {
  authTokenChanged: (token: string | null) => void;
  userChanged: (user: unknown) => void;
  userWalletsChanged: (
    wallets: { address: string; chain: string; connected: boolean }[]
  ) => void;
};

export type WebViewOutboundEventEmitter = EventEmitter<WebViewOutboundEvents>;
