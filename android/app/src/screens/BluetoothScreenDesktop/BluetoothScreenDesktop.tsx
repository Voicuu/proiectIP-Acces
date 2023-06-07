
// -----------------------------------------------------------------------------------------------------------------------------
// PAIRING CHECK WITH LAPTOP
import BluetoothManager from 'react-native-bluetooth-classic';
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationProp } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';  // We need this to request location permissions
import WifiManager from 'react-native-wifi-reborn';

let isPaired:boolean = false;
let isConnected:boolean = false;
interface BluetoothScreenProps {
    navigation: NavigationProp<any>;
  }
  

const BluetoothScreenDesktop: React.FC<BluetoothScreenProps> = ({ navigation }) => {
const handleBluetoothConnect = async () => {
    try {
      const devices = await BluetoothManager.getBondedDevices(); // Get a list of available Bluetooth devices
      console.log(devices);
      
      const hc05Device = devices.find(device => device.id === 'D8:3B:BF:E6:08:51');
      //const hc05Device = devices.find(device => device.id === 'DC:E9:94:0A:9F:26'); // Replace '98:D3:81:FD:3D:20' with the MAC address of your HC-05 device
      if(isPaired==true)
      {
        console.log(`Already connected to DESKTOP`);
        Alert.alert("Connection succesful DESKTOP",`Connected to device `);
        navigation.navigate('Home');
      }
      else
  
      if (hc05Device) {
        
        if(isPaired == false){
          BluetoothManager.unpairDevice(hc05Device.id);
        }
        BluetoothManager.pairDevice(hc05Device.id)
        console.log("Pairing with device...");
        if(await BluetoothManager.pairDevice(hc05Device.id))// Pair with the HC-05 device
          {
            console.log("Paired with device!!!");
            isPaired = true;
            Alert.alert("Connection succesful DESKTOP",`Connected to device ${hc05Device.name}`);
            navigation.navigate('Home');
          }
        console.log("Connecting to device...");
        await BluetoothManager.connectToDevice(hc05Device.address); // Connect to the HC-05 device
  
        
        // If the connection is successful, you can perform additional actions with the printer
        if (await BluetoothManager.isDeviceConnected(hc05Device.id)) {
          Alert.alert("Connection succesful DESKTOP",`Connected to device ${hc05Device.name}`);
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
        console.error("DESKTOP not found");
        // HC-05 device not found
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      // Handle Bluetooth connection error
    }
  };


  const sendHttpRequest = () => {
    const data = {
      Nume: 'John Doe',
      NrMasina: '1234',
      Poza: 'https://example.com/image.jpg',
    };
  
    fetch('http://192.168.100.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(responseData => {
        console.log('Response:', responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

const handleWifiConnect = async () => {
  // Before we try to connect, we need to make sure we have location permissions, as they are
  // required to connect to Wi-Fi networks on Android 10 and later.
  const locationStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  if (locationStatus !== 'granted') {
    Alert.alert('Permission required', 'You need to grant location permissions to connect to a Wi-Fi network');
    return;
  }
  
  WifiManager.connectToProtectedSSID('DIGI-wrXP', 'f7WJ3wMg', false,false)
    .then(() => {
      console.log('Connected successfully!');
    })
    .catch(error => {
      console.error(error);
    });
};
return (
  <View style={styles.container}>
    <Text style={styles.label}>Connect to the laptop via Bluetooth</Text>
    <View style={styles.input}>
      <View style={styles.buttonContainer}>
        <View style={styles.space}>
          <Button
            title="Connect to Desktop"
            onPress={handleBluetoothConnect}
          />
        </View>
        <Button
          title="Connect to WiFi"
          onPress={handleWifiConnect}
        />
        <Button
          title="Send HTTP Request"
          onPress={sendHttpRequest}
        />
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

  export default BluetoothScreenDesktop;
//-----------------------------------------------------------------------------------------------------------------------------------------

