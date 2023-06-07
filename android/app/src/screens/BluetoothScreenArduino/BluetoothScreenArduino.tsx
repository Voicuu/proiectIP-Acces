import BluetoothManager from 'react-native-bluetooth-classic';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationProp } from '@react-navigation/native';

let isConnected:boolean = false;

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
    <View style={styles.container}>
      <Text style={styles.label}>Connect to the Arduino via Bluetooth</Text>
      {/* IMEI input field... */}
      <View style={styles.input}>

         <View style={styles.buttonContainer}>

        <View style={styles.space}>
        <Button
          title="Connect to Arduino"
          onPress={handleBluetoothConnect}
        />
        </View>
        
      </View>
      </View>
      <Text style={styles.bluetoothStatus}></Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      color: "blue",
      paddingHorizontal:10,
      fontSize: 18,
      marginBottom: 10,
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
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: 20,
      width: '100%',
      marginTop: 10, 
    },
    button: {
    
    },
    bluetoothStatus:{
  
    },
    space: {
      marginVertical: 8, // Adjust the value as needed
    },
    discoveredDevicesContainer: {
      marginTop: 20,
    },
    deviceItem: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
  });

  export default BluetoothScreenArduino;
