import {
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { FC, useEffect } from 'react';
import { sendOutboundMessage } from '../utils/sendOutboundMessage';

export const SyncOuterCocoonClient: FC = () => {
  const { user, authToken } = useDynamicContext();
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

  return null;
};
