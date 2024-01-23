import { useClient } from '../DynamicClientProvider';
import { useChangeNotifier } from './useChangeNotifier';

export const useUser = () => {
  const client = useClient();

  useChangeNotifier(client.user);

  return client.user.user;
};
