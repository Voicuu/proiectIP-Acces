import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const logo = require('../../../icons/logo.png');

const BluetoothStatus = ({ isConnected }) => {
  return (
    <ImageBackground
      source={require('../../../icons/background.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={logo} style={styles.logoStyle}></Image>
      <View style={styles.container}>
        <Text style={styles.text}>
          Bluetooth Status: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoStyle: {
    marginTop: -500,
  },
});

export default BluetoothStatus;