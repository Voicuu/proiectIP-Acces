import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import React from 'react';
import SecondScreen from './android/app/src/screens/SecondScreen/SecondScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './android/app/src/screens/SignInScreen/SignInScreen';
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

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SignInScreen} />
      
        <Stack.Screen name="Second" component={SecondScreen} />
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