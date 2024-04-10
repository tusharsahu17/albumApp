import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import store from './src/feature/store';
import Tabs from './src/screens/Tabs/Tabs';
import Contacts from './src/screens/Contacts';

const App = () => {
  const [showTabs, setShowTabs] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {showTabs && <Tabs />}
        {showContacts && <Contacts />}
        {!showTabs && !showContacts && (
          <View style={styles.innerContainer}>
            <Text style={styles.text}>Please select any option</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowTabs(true)}>
              <Text style={styles.buttonText}>  Show Album  </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => setShowContacts(true)}>
              <Text style={styles.buttonText}>Show Contacts</Text>
            </TouchableOpacity>
            <Text style={[styles.text, { marginTop: 100 }]}>!! Welcome !!</Text>

          </View>
        )}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black'
  },
  button: {
    backgroundColor: '#0272bd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
