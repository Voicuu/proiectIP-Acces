import { NavigationProp } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'; // no compat for new SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { getDatabase, ref } from 'firebase/database';
import React, { useState } from 'react';
import { Alert, Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
//import BluetoothSerial from 'react-native-bluetooth-serial';
// import 'react-native-ble-plx';
// import { scanDevices, stopScan } from '../BluetoothConfig/BluetoothManager';
// import 'react-native-bluetooth-clasic';
//import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-classic';
import {
  BluetoothDevice,
  default as BluetoothEscposPrinter,
  BluetoothEventType,
  default as BluetoothManager,
  default as RNBluetoothClassic,
} from 'react-native-bluetooth-classic';

const firebaseConfig = {
  apiKey: "AIzaSyByzLUr1aKZ7E8IC4muXZvog2RTLlnf_Dc",
  authDomain: "acces-ff85a.firebaseapp.com",
  databaseURL: "https://acces-ff85a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "acces-ff85a",
  storageBucket: "acces-ff85a.appspot.com",
  messagingSenderId: "384900630593",
  appId: "1:384900630593:web:deac90827dcd1529bf1ec0",
  measurementId: "G-NWJ435C7G0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export const todosRef = ref(database, "todos")

// un cont random
const email: string  = 'andreicapac2222@gmail.com';
const password: string = 'password123';

interface SignInScreenProps {
  navigation: NavigationProp<any>;
}
const logo = require('../../../icons/logo.png');

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [imei, setImei] = useState('');

  
  const handleSignIn = () => {
    // if (imei.length === 16) { //nu e buna conditia pentru imei si nu ajunge pe navigation (schimbata din 15 in 16)
    //   // Call the onSignIn callback from the parent component or perform sign-in logic here
    //   console.log('Signed in with IMEI:', imei);
      //Firebase
      const signUpWithImei = async () => {

        // mai intai decomentezi partea asta si iti creezi user

        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then((userCredential) => {
        //     // User creation successful
        //     const user = userCredential.user;
        //     console.log('User created:', user);
        //   })
        //   .catch((error) => {
        //     // User creation failed
        //     console.error('Error creating user:', error);
        //   });

        // dupa ce reusesti si iti va spune ca user ul a fost creat, o comentezi la loc

        try {
          firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('Firebase: User signed in successfully!');
            // Perform any additional actions after successful sign-in
          })
          .catch((error) => {
            console.error('Firebase: Error signing in:', error);
            // Handle sign-in errors
          });
          

          const user = firebase.auth().currentUser;
          if(user)
          {
            const userId = user.uid;
          // Retrieve the user's IMEI code from Realtime Database
          const database = firebase.database();
          //const userRef = database.ref(`users/${userId}`);
          const userRef = database.ref(`Angajati/marian`);
          userRef.once('value', (snapshot) => {
            const userData = snapshot.val();
            const firebaseImeiCode = userData?.imei; // aici trebuie umblat, trebuie sa preluam datele din firebase 
            console.log('Firebase IMEI:', firebaseImeiCode);
            console.log('Phone    IMEI:', imei);
            if (firebaseImeiCode === imei) {
              console.log('IMEI codes match');
              console.log('Signed in with IMEI:', imei);
              Alert.alert('Success', `Signed in successfully using the IMEI\n${imei} !`);
              // HERE I NEED TO WRITE TO ARDUINO
              const message = "1";
              sendMessageToArduino(message);
              navigation.navigate('Details'); 
            } else {
              console.log('IMEI codes do not match');
              const message = "0";
              sendMessageToArduino(message);
              Alert.alert('Error', `IMEI Codes do not match!`);
            }
          });
        }else
        {
          console.log('User not authenticated');
          const message = "0";
          sendMessageToArduino(message);
        }
        } catch (error) {
          console.error(error);
        }
      };
      signUpWithImei();
    // } else {
    //   Alert.alert('IMEI Code', 'Please enter a valid 15-digit IMEI code.');
    // }
  };


  const sendMessageToArduino = async ( message : String ) => {
    
    try {
      const devices = await BluetoothManager.getBondedDevices();
      const hc05Device = devices.find(device => device.id === '98:D3:81:FD:3D:20');
      //const buffer = []; // Replace with your desired message
      //buffer.push(1);
      
      //const message = "1";
      if(hc05Device)
      {
        BluetoothManager.writeToDevice(hc05Device.address,message.toString());
        console.log('Message sent to Arduino:', message);
      }
    } catch (error) {
      console.error('Bluetooth write error:', error);
    }
  };

  const handleGenerateImei = async () => {
    const deviceImei = await DeviceInfo.getUniqueId();
    setImei(deviceImei);
    Alert.alert('IMEI Status', `Generated IMEI code: ${deviceImei}`);
  };

//--- bluetooth configuration ---

 let isConnected:boolean = false;

 const handleBluetoothDisconnectArduino = async () => {
  try {
    const devices = await BluetoothManager.getBondedDevices();
    //const hc05Device = devices.find(device => device.name === 'Andrei’s iPhone');
    const hc05Device = devices.find(device => device.id === '98:D3:81:FD:3D:20'); // Replace with the MAC address of your HC-05 device
    if (hc05Device) {
      console.log("Disconnecting from device...");
      await BluetoothManager.disconnectFromDevice(hc05Device.address); // Disconnect from the HC-05 device

      // If the disconnection is successful, update the isConnected state
      if (!(await BluetoothManager.isDeviceConnected(hc05Device.id))) {
        console.log("Disconnected from device");
        navigation.navigate('Options');
        isConnected = false;
      } else {
        console.error("Failed to disconnect from device");
        // Handle disconnection error
      }
    } else {
      console.error("HC-05 device not found");
      // HC-05 device not found
    }
  } catch (error) {
    console.error("Bluetooth disconnection error:", error);
    // Handle Bluetooth disconnection error
  }
};

const handleBluetoothDisconnectDesktop = async () => {
  try {
    const devices = await BluetoothManager.getBondedDevices();
    const hc05Device = devices.find(device => device.id === 'DC:E9:94:0A:9F:26'); // Replace with the MAC address of your DESKTOP
    if (hc05Device) {
      console.log("Disconnecting from device...");
      //await BluetoothManager.disconnectFromDevice(hc05Device.address); // Disconnect from the HC-05 device
      BluetoothManager.unpairDevice(hc05Device.address); // Unpair from DESKTOP
      navigation.navigate('Options');
    } else {
      console.error("DESKTOP device has a problem");
      // HC-05 device not found
      
    }
  } catch (error) {
    console.error("Bluetooth disconnection error:", error);
    // Handle Bluetooth disconnection error
    navigation.navigate('Home');
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
      <View style={styles.container}>
        <Image source={logo} style={styles.logoStyle}></Image>
        <Text style={styles.label}>Enter your IMEI code:</Text>
        
        <TextInput
          
          style={styles.input}
          placeholder="15-digit IMEI code"
          maxLength={16}
          keyboardType="default"
          editable={false}
          onChangeText={setImei}
          value={imei}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignIn}
          >
            <Text style={styles.buttonText}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleGenerateImei}
          >
            <Text style={styles.buttonText}>
              Generate IMEI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleBluetoothDisconnectArduino}
          >
            <Text style={styles.buttonText}>
              Disconnect Bluetooth from Arduino
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleBluetoothDisconnectDesktop}
          >
            <Text style={styles.buttonText}>
              Disconnect Bluetooth from Desktop
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoStyle: {
    marginTop: 25,
    marginBottom: 25,
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    color: "#1e5cd9",
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    width: 300,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%',
    marginTop: 10, 
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
  },
});

export default SignInScreen;
