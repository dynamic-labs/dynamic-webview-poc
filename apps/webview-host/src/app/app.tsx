import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { SyncOuterCocoonClient } from '../components/SyncOuterCocoonClient';

export function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'c71367f8-1957-4631-ba1e-fe86d67b836c',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWidget />

      <SyncOuterCocoonClient />
    </DynamicContextProvider>
  );
}

export default App;
