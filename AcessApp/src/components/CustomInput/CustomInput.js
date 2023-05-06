import { View, Text, TextInput, StyleSheet } from 'react-native';
import IMEI from 'react-native-imei';
import React from 'react';

const CustomInput = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="aici o sa vina codul IMEI"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', 
  },
});

export default CustomInput;
