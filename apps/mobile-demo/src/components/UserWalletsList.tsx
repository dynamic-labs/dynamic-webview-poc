import { FC } from 'react';
import { useUserWallets } from 'react-hooks';
import { View, Text } from 'react-native';
import { WalletButtonItem } from './WalletButtonItem';

export const UserWalletsList: FC = () => {
  const userWallets = useUserWallets();

  if (userWallets.length === 0) {
    return <Text>No wallets</Text>;
  }

  return (
    <View>
      <Text>Wallets</Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          paddingTop: 8,
        }}
      >
        {userWallets.map((wallet) => (
          <WalletButtonItem key={wallet.address} wallet={wallet} />
        ))}
      </View>
    </View>
  );
};
