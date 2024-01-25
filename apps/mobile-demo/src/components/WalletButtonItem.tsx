import { Wallet } from 'client';
import { FC } from 'react';
import { Button, Text, View } from 'react-native';

export const WalletButtonItem: FC<{ wallet: Wallet }> = ({ wallet }) => {
  const signMessage = async () => {
    const signedMessage = await wallet.walletClient.signMessage({
      message: 'hello world',
    });

    alert(signedMessage);
  };

  const getAddresses = async () => {
    const addresses = await wallet.walletClient.getAddresses();

    alert(JSON.stringify({ addresses }));
  };

  return (
    <View>
      <View>
        <Text>Address: {wallet.address}</Text>
        <Text>Chain: {wallet.chain}</Text>
        <Text>Connected: {JSON.stringify(wallet.connected)}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Button title="Addresses" onPress={getAddresses} />
        <Button title="Sign Message" onPress={signMessage} />
      </View>
    </View>
  );
};
