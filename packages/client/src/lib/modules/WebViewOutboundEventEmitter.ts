import EventEmitter from 'eventemitter3';

export type WebViewOutboundEvents = {
  authTokenChanged: (token: string | null) => void;
  userChanged: (user: unknown) => void;
  userWalletsChanged: (
    wallets: { address: string; chain: string; connected: boolean }[]
  ) => void;
  requestRpcReject: (props: { id: string; data: unknown }) => void;
  requestRpcResolve: (props: { id: string; data: unknown }) => void;
  showAuthFlowChanged: (showAuthFlow: boolean) => void;
  modalDisplayChanged: (modalId: string, open: boolean) => void;
};

export type WebViewOutboundEventEmitter = EventEmitter<WebViewOutboundEvents>;
