import {
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { WebViewInboundEvents } from 'client';
import { FC, useEffect } from 'react';
import { sendOutboundMessage } from '../utils/sendOutboundMessage';
import { WalletClient } from 'viem';

export const InboundMessageHandler: FC = () => {
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();
  const wallets = useUserWallets();

  useEffect(() => {
    return onInboundMessage('setShowAuthFlow', (show: boolean) => {
      setShowAuthFlow(show);
    });
  }, [setShowAuthFlow]);

  useEffect(() => {
    return onInboundMessage('logout', () => handleLogOut());
  }, [handleLogOut]);

  useEffect(() => {
    return onInboundMessage('requestRpc', async ({ id, address, args }) => {
      try {
        const wallet = wallets.find((wallet) => wallet.address === address);

        if (!wallet) {
          sendOutboundMessage('requestRpcReject', [
            {
              data: 'Wallet not found',
              id,
            },
          ]);
          return '';
        }

        const signer = await wallet.connector.getWalletClient<
          Promise<WalletClient>
        >();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = await signer.transport.request(args as any);

        sendOutboundMessage('requestRpcResolve', [
          {
            id,
            data,
          },
        ]);
      } catch (err: unknown) {
        const error = err as { message?: string };

        sendOutboundMessage('requestRpcReject', [
          {
            data: error?.message || 'unknown error',
            id,
          },
        ]);
      }
      return '';
    });
  }, [wallets]);

  return null;
};

const onInboundMessage = <T extends keyof WebViewInboundEvents>(
  eventName: T,
  handler: WebViewInboundEvents[T]
) => {
  const inboundEventHandler = async (event: MessageEvent<string>) => {
    // Handle the message
    let parsedData;

    try {
      parsedData = JSON.parse(event.data);
    } catch (err) {
      console.log('error parsing data', err);
      return;
    }

    console.log('🚀 ~ window.addEventListener ~ parsedData:', parsedData);

    if (!parsedData) return;

    if (parsedData.handler !== eventName) return;

    const args: unknown[] = parsedData.data as unknown[];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    handler(...args);

    return true;
  };

  window.addEventListener('message', inboundEventHandler);

  return () => {
    window.removeEventListener('message', inboundEventHandler);
  };
};
