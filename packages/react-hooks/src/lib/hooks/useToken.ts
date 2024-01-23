import { useClient } from '../DynamicClientProvider';
import { useChangeNotifier } from './useChangeNotifier';

export const useToken = () => {
  const client = useClient();

  useChangeNotifier(client.auth);

  return client.auth.token;
};
