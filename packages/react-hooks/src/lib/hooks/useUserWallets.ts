import { useClient } from '../DynamicClientProvider';
import { useChangeNotifier } from './useChangeNotifier';

export const useUserWallets = () => {
  const client = useClient();

  useChangeNotifier(client.userWallets);

  return client.userWallets.data;
};
