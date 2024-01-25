import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { SyncOuterCocoonClient } from '../components/SyncOuterCocoonClient';
import { InboundMessageHandler } from '../components/InboundMessageHandler';

export function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'c71367f8-1957-4631-ba1e-fe86d67b836c',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <SyncOuterCocoonClient />
      <InboundMessageHandler />
    </DynamicContextProvider>
  );
}

export default App;
