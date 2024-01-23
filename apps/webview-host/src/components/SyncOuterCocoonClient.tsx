import {
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { WebViewOutboundEvents } from 'client';
import { FC, useEffect } from 'react';

export const SyncOuterCocoonClient: FC = () => {
  const { user, authToken } = useDynamicContext();
  const wallets = useUserWallets();

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  useEffect(() => {
    sendOutboundMessage('authTokenChanged', [authToken || null]);
  }, [authToken]);

  useEffect(() => {
    console.log('wallets', wallets);
  }, [wallets]);

  return null;
};

const sendOutboundMessage = <T extends keyof WebViewOutboundEvents>(
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
