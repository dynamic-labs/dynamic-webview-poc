import { Client } from 'client';
import { FC, PropsWithChildren, createContext, useContext } from 'react';

export const dynamicClientContext = createContext<
  { client: Client } | undefined
>(undefined);

export const DynamicClientProvider: FC<
  PropsWithChildren<{ client: Client }>
> = ({ client, children }) => {
  const { Provider } = dynamicClientContext;

  return <Provider value={{ client }}>{children}</Provider>;
};

export const useClient = <T extends Client>(): T => {
  const context = useContext(dynamicClientContext);

  if (!context) {
    throw new Error('useClient must be used within a DynamicClientProvider');
  }

  return context.client as T;
};
