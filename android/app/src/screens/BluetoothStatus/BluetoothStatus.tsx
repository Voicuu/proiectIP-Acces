import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BluetoothStatus = ({ isConnected }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bluetooth Status: {isConnected ? 'Connected' : 'Disconnected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BluetoothStatus;