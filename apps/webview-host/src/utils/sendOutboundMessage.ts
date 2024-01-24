import { WebViewOutboundEvents } from 'client';

export const sendOutboundMessage = <T extends keyof WebViewOutboundEvents>(
  handler: T,
  data: Parameters<WebViewOutboundEvents[T]>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).ReactNativeWebView.postMessage(
    JSON.stringify(
      {
        handler,
        data,
      },
      null,
      2
    )
  );
};
