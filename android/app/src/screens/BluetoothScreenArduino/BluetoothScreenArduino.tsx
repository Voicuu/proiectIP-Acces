import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BluetoothManager from 'react-native-bluetooth-classic';
import DeviceInfo from 'react-native-device-info';

let isConnected:boolean = false;
const logo = require('../../../icons/logo.png');

interface BluetoothScreenProps {
    navigation: NavigationProp<any>;
  }
  

const BluetoothScreenArduino: React.FC<BluetoothScreenProps> = ({ navigation }) => {
const handleBluetoothConnect = async () => {
    try {
      const devices = await BluetoothManager.getBondedDevices(); // Get a list of available Bluetooth devices
      console.log(devices);
      //const hc05Device = devices.find(device => device.name === 'Andrei’s iPhone');
      const hc05Device = devices.find(device => device.id === '98:D3:81:FD:3D:20'); // Replace '98:D3:81:FD:3D:20' with the MAC address of your HC-05 device
      if(hc05Device && await BluetoothManager.isDeviceConnected(hc05Device.id) == true)
      {
        console.log(`Already connected to ${hc05Device.name}`);
        navigation.navigate('Home');
      }
      else
  
      if (hc05Device) {
        //console.log("Pairing with device...");
        //await BluetoothManager.pairDevice(hc05Device.id); // Pair with the HC-05 device
        console.log("Connecting to device...");
        await BluetoothManager.connectToDevice(hc05Device.address); // Connect to the HC-05 device
  
        // If the connection is successful, you can perform additional actions with the printer
        if (await BluetoothManager.isDeviceConnected(hc05Device.id)) {
          Alert.alert("Connection succesful",`Connected to device ${hc05Device.name}`);
          console.log("Connected to device");
          isConnected = true;
          navigation.navigate('Home');
          // Perform any other actions with the printer
        } else {
          console.error("Failed to connect to device");
          Alert.alert("Connection failed","Try Again");
          // Handle connection error
        }
      } else {
        console.error("HC-05 device not found");
        // HC-05 device not found
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      // Handle Bluetooth connection error
    }
  };

  

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
        <Text style={styles.label}>Conectare la Arduino</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleBluetoothConnect}
        >
          <Text style={styles.buttonText}>Conecteaza la Arduino</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    logoStyle: {
      marginTop: 45,
    },
    label: {
      paddingHorizontal:10,
      fontSize: 18,
      marginBottom: 10,
      flex: 1,
      textAlign: 'center',
      width: 250,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      fontSize: 16,
      textAlign: 'center',
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 10,
      width: 300,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

  export default BluetoothScreenArduino;
