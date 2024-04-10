import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Home from './Home';
import Favourite from './Favourite';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <View style={styles.container}>
      {activeTab === 'tab1' && <Home />}
      {activeTab === 'tab2' && <Favourite />}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('tab1')}>
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('tab2')}>
          <Text style={styles.tabButtonText}>Favourite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#EEE',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 16,
  },
});

export default Tabs;
