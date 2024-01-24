/* eslint-disable jsx-a11y/accessible-emoji */
import { createClient } from 'client';
import { DynamicCocoon } from 'react-native-cocoon';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Button,
} from 'react-native';
import { DynamicClientProvider } from 'react-hooks';
import { DisplayUser } from '../components/DisplayUser';
import { UserWalletsList } from '../components/UserWalletsList';

// Client
const client = createClient();

export const App = () => {
  return (
    <DynamicClientProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={{ height: 600, width: '100%' }}>
            <DynamicCocoon client={client} />
          </View>

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
