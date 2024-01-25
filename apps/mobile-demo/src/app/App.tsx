/* eslint-disable jsx-a11y/accessible-emoji */
import { createClient } from 'client';
import { DynamicCocoon } from 'react-native-cocoon';

import React, { FC } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Button,
} from 'react-native';
import { DynamicClientProvider, useToken } from 'react-hooks';
import { DisplayUser } from '../components/DisplayUser';
import { UserWalletsList } from '../components/UserWalletsList';

const client = createClient();

const LoginView: FC = () => {
  return <Button title="Login" onPress={() => client.auth.open()} />;
};

const MyAppView: FC = () => {
  const token = useToken();

  if (!token) {
    return <LoginView />;
  }

  return (
    <View>
      <Button title="Logout" onPress={() => client.auth.logout()} />

      <Button
        title="Show auth token"
        onPress={() => alert(client.auth.token)}
      />

      <View style={{ padding: 16 }}>
        <DisplayUser />
      </View>

      <View style={{ padding: 16 }}>
        <UserWalletsList />
      </View>
    </View>
  );
};

export const App = () => {
  return (
    <DynamicClientProvider client={client}>
      <DynamicCocoon client={client} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <MyAppView />
        </ScrollView>
      </SafeAreaView>
    </DynamicClientProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
});

export default App;
