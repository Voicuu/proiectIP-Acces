import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationProp } from '@react-navigation/native';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app' // no compat for new SDK
import { getDatabase, ref } from 'firebase/database'
//import BluetoothSerial from 'react-native-bluetooth-serial';
import 'react-native-ble-plx';
import { scanDevices, stopScan } from '../BluetoothConfig/BluetoothManager';
import { BleManager, Device } from 'react-native-ble-plx';

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

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [imei, setImei] = useState('');
  const [bluetoothStatus, setBluetoothStatus] = useState('Bluetooth not connected');
  const [bluetoothManager, setBluetoothManager] = useState<BleManager | null>(null);

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
              navigation.navigate('Options'); // Replace 'AnotherScreen' with the name of the screen you want to navigate to
            } else {
              console.log('IMEI codes do not match');
              Alert.alert('Error', `IMEI Codes do not match!`);
            }
          });
        }else
        {
          console.log('User not authenticated');
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

  const handleGenerateImei = async () => {
    const deviceImei = await DeviceInfo.getUniqueId();
    setImei(deviceImei);
    Alert.alert('IMEI Status', `Generated IMEI code: ${deviceImei}`);
  };

//--- bluetooth configuration ---

const handleBluetoothSearch = async () => {
  const manager = new BleManager();
  setBluetoothManager(manager);

  try {
    // Start scanning for devices
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error scanning devices:', error);
        return;
      }

      if (device) {
        // Process discovered device
        console.log('Discovered device:', device.id, device.name);
        // Connect to the HC-05 Bluetooth module
        if (device.name === 'HC-05') {
          manager.stopDeviceScan(); // Stop scanning for devices

          device
            .connect()
            .then((device: Device) => {
              console.log('Connected to device:', device.id, device.name);
              setBluetoothStatus('Bluetooth connected');
              // Perform any additional actions after successful connection
            })
            .catch((error: any) => {
              console.error('Error connecting to device:', error);
            });
        }
      }
    });
  } catch (error) {
    console.error('Bluetooth search error:', error);
  }
};


const handleBluetoothDisconnect = async () => {
  if (bluetoothManager) {
    const connectedDevices = await bluetoothManager.connectedDevices([]); // Get the list of connected devices

    if (connectedDevices.length > 0) {
      const connectedDevice = connectedDevices[0]; // Assuming there is only one connected device
      console.log('Disconnecting from device:', connectedDevice.id, connectedDevice.name);

      try {
        connectedDevice
          .cancelConnection()
          .then(() => {
            console.log('Disconnected from device:', connectedDevice.id, connectedDevice.name);
            setBluetoothStatus('Bluetooth disconnected');
            // Perform any additional actions after successful disconnection
          })
          .catch((error: any) => {
            console.error('Error disconnecting from device:', error);
          });
      } catch (error) {
        console.error('Bluetooth disconnect error:', error);
      }
    }
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.label}>Enter your IMEI code:</Text>
    {/* IMEI input field... */}
    <View style={styles.buttonContainer}>
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Generate IMEI" onPress={handleGenerateImei} />
      <Button
        title="Search Bluetooth"
        onPress={handleBluetoothSearch}
        disabled={bluetoothStatus === 'Bluetooth connected'}
      />
      <Button
        title="Disconnect Bluetooth"
        onPress={handleBluetoothDisconnect}
        disabled={bluetoothStatus === 'Bluetooth not connected'}
      />
    </View>
    <Text style={styles.bluetoothStatus}>{bluetoothStatus}</Text>
  </View>
);
};

//--no bluetooth version
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter your IMEI code:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="15-digit IMEI code"
//         maxLength={16}
//         keyboardType="default"
//         editable={false}
//         onChangeText={setImei}
//         value={imei}
//       />
//       <View style={styles.buttonContainer}>
//         <Button title="Sign In" onPress={handleSignIn}/>
//         <Button title="Generate IMEI" onPress={handleGenerateImei} />
//       </View>
//     </View>
//   );
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10, 
  },
  button: {
  
  },
  bluetoothStatus:{

  },
});

export default SignInScreen;
