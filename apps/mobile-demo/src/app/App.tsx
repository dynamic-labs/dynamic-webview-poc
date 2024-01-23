/* eslint-disable jsx-a11y/accessible-emoji */
import { createClient } from 'client';
import { Cocoon } from 'react-native-cocoon';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  View,
  Button,
} from 'react-native';

const client = createClient();
console.log('🚀 ~ client:', client);

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Text>Cocoon Demo</Text>
          <Button
            title="Show auth token"
            onPress={() => alert(client.auth.token)}
          />
          <View style={{ height: 600, width: '100%' }}>
            <Cocoon client={client} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
});

export default App;
