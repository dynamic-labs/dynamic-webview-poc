export type WebViewInboundEvents = {
  requestRpc: (args: {
    id: string;
    address: string;
    args: unknown[];
  }) => Promise<string>;
  setShowAuthFlow: (showAuthFlow: boolean) => void;
};

export class WebViewInboundEventEmitter {
  private listener: (event: string, ...args: unknown[]) => void = () => {};

  send<K extends keyof WebViewInboundEvents>(
    event: K,
    ...args: Parameters<WebViewInboundEvents[K]>
  ) {
    this.listener(event, ...args);
  }

  onAny(listener: (event: string, ...args: unknown[]) => void) {
    this.listener = listener;
  }
}
