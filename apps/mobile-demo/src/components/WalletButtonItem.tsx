import { Wallet } from 'client';
import { FC, useState } from 'react';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';

export const WalletButtonItem: FC<{ wallet: Wallet }> = ({ wallet }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
          <Text>Address: {wallet.address}</Text>
          <Text>Chain: {wallet.chain}</Text>
          <Text>Connected: {JSON.stringify(wallet.connected)}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <Button title="Addresses" onPress={getAddresses} />
          <Button title="Sign Message" onPress={signMessage} />
        </View>
      </Modal>
    </>
  );
};
