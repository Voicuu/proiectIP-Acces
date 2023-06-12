
// -----------------------------------------------------------------------------------------------------------------------------
// PAIRING CHECK WITH LAPTOP
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BluetoothManager from 'react-native-bluetooth-classic';
import DeviceInfo from 'react-native-device-info';
import { PERMISSIONS, request } from 'react-native-permissions'; // We need this to request location permissions
import WifiManager from 'react-native-wifi-reborn';

let isPaired:boolean = false;
let isConnected:boolean = false;
const logo = require('../../../icons/logo.png');
interface BluetoothScreenProps {
    navigation: NavigationProp<any>;
  }
  

const BluetoothScreenDesktop: React.FC<BluetoothScreenProps> = ({ navigation }) => {
const handleBluetoothConnect = async () => {
    try {
      const devices = await BluetoothManager.getBondedDevices(); // Get a list of available Bluetooth devices
      console.log(devices);
      
      //const desktopDevice = devices.find(device => device.id === 'D8:3B:BF:E6:08:51');
      //const desktopDevice = devices.find(device => device.id === 'B8:90:47:1A:52:D6');
      const desktopDevice = devices.find(device => device.id === 'DC:E9:94:0A:9F:26'); // Replace '98:D3:81:FD:3D:20' with the MAC address of your HC-05 device
      if(isPaired==true)
      {
        console.log(`Already connected to DESKTOP`);
        Alert.alert("Connection succesful DESKTOP",`Already connected to device `);
        navigation.navigate('Home');
      }
      else
  
      if (desktopDevice) {
        
        if(isPaired == false){
          BluetoothManager.unpairDevice(desktopDevice.id);
        }
        BluetoothManager.pairDevice(desktopDevice.id)
        console.log("Pairing with device...");
        if(await BluetoothManager.pairDevice(desktopDevice.id))// Pair with the HC-05 device
          {
            console.log("Paired with device!!!");
            isPaired = true;
            Alert.alert("Pairing succesful DESKTOP",`Paired to device ${desktopDevice.name}`);
            navigation.navigate('Home');
          }
        console.log("Connecting to device...");
        await BluetoothManager.connectToDevice(desktopDevice.address); // Connect to the HC-05 device
  
        
        // If the connection is successful, you can perform additional actions with the printer
        if (await BluetoothManager.isDeviceConnected(desktopDevice.id)) {
          Alert.alert("Connection succesful DESKTOP",`Connected to device ${desktopDevice.name}`);
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
        //Alert.alert("DESKTOP Device not found ","Check your bluetooth connection");
      }
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      // Handle Bluetooth connection error
      Alert.alert("Bluetooth connection error","Check your bluetooth connection");
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
  
  WifiManager.connectToProtectedSSID(`Andrei’s iPhone`, 'andrj2323', false,false)
    .then(() => {
      console.log('Connected successfully!');
      Alert.alert("Connection succesful DESKTOP via Wi-Fi",`Connected via Wi-Fi`);
      isConnected = true;
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error(error);
    });
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
        <Text style={styles.label}>Conectare la Desktop</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleBluetoothConnect}
        >
          <Text style={styles.buttonText}>Conecteaza la Desktop</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleWifiConnect}
        >
          <Text style={styles.buttonText}>Conecteaza la Wi-fi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={sendHttpRequest}
        >
          <Text style={styles.buttonText}>Trimite cerere HTTP</Text>
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
    label: {
      color: "#1e5cd9",
      paddingHorizontal:10,
      fontSize: 18,
      marginBottom: 10,
      width: 250,
      textAlign: 'center',
      flex: 1
    },
    logoStyle: {
      marginTop: 45,
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      width: 300,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });

  export default BluetoothScreenDesktop;
//-----------------------------------------------------------------------------------------------------------------------------------------

