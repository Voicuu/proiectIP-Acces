import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationProp } from '@react-navigation/native';

interface SignInScreenProps {
  navigation: NavigationProp<any>;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [imei, setImei] = useState('');

  const handleSignIn = () => {
    if (imei.length === 16) { //nu e buna conditia pentru imei si nu ajunge pe navigation (schimbata din 15 in 16)
      // Call the onSignIn callback from the parent component or perform sign-in logic here
      console.log('Signed in with IMEI:', imei);
      navigation.navigate('Second'); // Replace 'AnotherScreen' with the name of the screen you want to navigate to
    } else {
      Alert.alert('IMEI Code', 'Please enter a valid 15-digit IMEI code.');
    }
  };

  const handleGenerateImei = async () => {
    const deviceImei = await DeviceInfo.getUniqueId();
    setImei(deviceImei);
    Alert.alert('Success', `Generated IMEI code: ${deviceImei}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your IMEI code:</Text>
      <TextInput
        style={styles.input}
        placeholder="15-digit IMEI code"
        maxLength={15}
        keyboardType="numeric"
        onChangeText={setImei}
        value={imei}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSignIn}/>
        <Button title="Generate IMEI" onPress={handleGenerateImei} />
      </View>
    </View>
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
});

export default SignInScreen;
