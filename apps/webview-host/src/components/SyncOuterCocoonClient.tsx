import {
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { FC, useEffect } from 'react';
import { sendOutboundMessage } from '../utils/sendOutboundMessage';
import { observeElementChildren } from '../utils/observeElementChildren';

export const SyncOuterCocoonClient: FC = () => {
  const { user, authToken, showAuthFlow } = useDynamicContext();
  const wallets = useUserWallets();

  useEffect(() => {
    sendOutboundMessage('userChanged', [user || null]);
  }, [user]);

  useEffect(() => {
    sendOutboundMessage('authTokenChanged', [authToken || null]);
  }, [authToken]);

  useEffect(() => {
    sendOutboundMessage('userWalletsChanged', [
      wallets.map((wallet) => ({
        address: wallet.address,
        chain: wallet.chain,
        connected: wallet.connected,
      })),
    ]);
  }, [wallets]);

  useEffect(() => {
    sendOutboundMessage('showAuthFlowChanged', [showAuthFlow]);
  }, [showAuthFlow]);

  useEffect(
    () =>
      observeElementChildren('dynamic-send-transaction', (children) => {
        const isOpen = (children?.length || 0) > 0;

        sendOutboundMessage('modalDisplayChanged', [
          'dynamic-send-transaction',
          isOpen,
        ]);
      }),
    []
  );

  useEffect(
    () =>
      observeElementChildren('dynamic-sign-message', (children) => {
        const isOpen = (children?.length || 0) > 0;

        sendOutboundMessage('modalDisplayChanged', [
          'dynamic-sign-message',
          isOpen,
        ]);
      }),
    []
  );

  useEffect(
    () =>
      observeElementChildren('dynamic-send-balance', (children) => {
        const isOpen = (children?.length || 0) > 0;

        sendOutboundMessage('modalDisplayChanged', [
          'dynamic-send-balance',
          isOpen,
        ]);
      }),
    []
  );

  useEffect(
    () =>
      observeElementChildren('dynamic-edit-user-field', (children) => {
        const isOpen = (children?.length || 0) > 0;

        sendOutboundMessage('modalDisplayChanged', [
          'dynamic-edit-user-field',
          isOpen,
        ]);
      }),
    []
  );

  return null;
};
