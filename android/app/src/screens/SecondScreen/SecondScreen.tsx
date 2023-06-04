import React, { useState } from 'react';
import { TouchableOpacity,View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import DataScreen from '../DataScreen/DataScreen';
import LogsScreen from '../LogsScreen/LogsScreen';
const logo = require('../../../icons/logo.png');
//@ts-ignore
const SecondScreen = ( {navigation} ) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input7, setInput7] = useState('');
  const [input8, setInput8] = useState('');

  const handleButton1Press = () => {
    // Handle button 1 press logic here
    navigation.navigate('Logs');
  };

  const handleButton2Press = () => {
    // Handle button 2 press logic here
    navigation.navigate('Data');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.label}>Nume si prenume</Text>
      <TextInput
        style={styles.input1}
        value={input1}
        onChangeText={setInput1}
        placeholder="Introduceti numele si prenumele"
      />

      {/* Repeat the above pattern for the remaining textboxes */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
          <Text style={styles.buttonText}>Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>Date Utilizator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  logo:
  {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop:10,
  },
  label: {
    alignSelf: 'center',
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  input1: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    
  },
  buttonContainer: {
    alignItems:'center',
    
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:20,
   
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default SecondScreen;

// import React, { useState } from 'react';
// import { View, Text, Image, ScrollView,Button,StyleSheet } from 'react-native';

//  const SecondScreen = () =>{
//   return (
//     <View style = {stylesheet.styleRectanglel} ></View>
//     <Text style = {stylesheet.styleNumeSiPrenume_ } >| Nume si prenume:</Text>
//       <View style = {stylesheet.styleFrame1} >
  
//     </View>
  
//     <Image style = {stylesheet.styleLogol } source = "C:\Users\andre\Projects\MobileApp\proiectIP-Acces\android\app\icons">
//     </Image>
  
//     <View style = {stylesheet.styleFrame2} >
//     <View style = {stylesheet.styleRectangle2} >
//     </View>
  
//     <Text style = {stylesheet.stylePressMet } >
//     | press me1
  
//     </Text>
  
//     </View>
//   )
// }
