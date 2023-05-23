import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import React from 'react';
import SecondScreen from './android/app/src/screens/SecondScreen/SecondScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './android/app/src/screens/SignInScreen/SignInScreen';
import SelectableScreen from './android/app/src/screens/SelectableScreen/SelectableScreen';
import auth from '@react-native-firebase/auth';
import { Database } from 'firebase/database';
//import firebase from './firebase';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
//import database from '@react-native-firebase/database';

interface SignInProps {
  onSignIn: (imei: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [imei, setImei] = useState('');
  const Stack = createNativeStackNavigator();
  
  const handleSignIn = () => {
    // validate IMEI input and pass it to the onSignIn callback
    if (imei.length === 15) {
      onSignIn(imei);
    } else {
      Alert.alert('IMEI  Code','Please enter a valid 15-digit IMEI code.');
    }
  };

  const handleGenerateImei = async () => {
    // generate the device's IMEI code and populate the input field
    const deviceImei = DeviceInfo.getUniqueId();
    // setting the device's imei
    setImei(await deviceImei);
    Alert.alert('Success', `Generated IMEI code: ${imei}`);
  };

  // sign in code to be implemented using the imei codeW
  // firebase example
  
  const retrieveImeiCode = async () => {
    try {
      // Retrieve the user's IMEI code from Realtime Database
      const userId = 'andrj'; // Replace with the appropriate user ID
      const userRef = firebase.database().ref(`users/${userId}`);
      userRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        const firebaseImeiCode = userData?.imeiCode;
  
        if (firebaseImeiCode === imei) {
          console.log('IMEI codes match');
        } else {
          console.log('IMEI codes do not match');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SignInScreen} />
      
        <Stack.Screen name="Options" component={SelectableScreen} />

        <Stack.Screen name="Details" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default SignIn;