import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    window?.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable().then(
      alert
    );
  }, []);

  const createPasskey = () => {
    navigator.credentials.create({
      publicKey: {
        // Relying Party
        rp: {
          name: 'Example Corp',
        },
        // User
        user: {
          id: new Uint8Array(16),
          name: 'johndoe@example.com',
          displayName: 'John Doe',
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7, // ECDSA w/ SHA-256
          },
        ],
        challenge: new Uint8Array([
          /* random bytes here */
        ]),
        timeout: 60000, // 60 seconds
        // Authenticator selection criteria
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          requireResidentKey: false,
          userVerification: 'preferred',
        },
        attestation: 'direct',
      },
    });
  };

  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: 'c71367f8-1957-4631-ba1e-fe86d67b836c',
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <DynamicWidget />
      </DynamicContextProvider>
      <button onClick={createPasskey}>Passkey</button>
    </>
  );
}

export default App;
