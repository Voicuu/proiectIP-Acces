import React, { useState } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DataScreen from '../DataScreen/DataScreen';
import LogsScreen from '../LogsScreen/LogsScreen';
import { ref, push, set,child, get } from 'firebase/database';
import {database} from '../../../../../firebase';
import {Alert} from 'react-native';
const logo = require('../../../icons/logo.png');

//@ts-ignore
const SecondScreen = ( {navigation}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input7, setInput7] = useState('');
  const [input8, setInput8] = useState('');

  const handleButton2Press = async () => {
    const databaseRef = ref(database, 'Angajati');
    const snapshot = await get(databaseRef);
    const fetchedNames = Object.values(snapshot.val()).map((person: any) => person.Nume);
  
    if (!fetchedNames.includes(input1)) {
      Alert.alert('Name does not exist!');
      return;
    }
  
    navigation.navigate('Data', { name: input1 });
  };

  const handleButton1Press = async () => {
    const now = new Date();
    const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
    const databaseRef = ref(database, 'Angajati');
    const snapshot = await get(databaseRef);
    const personData = Object.values(snapshot.val()).find((person: any) => person.Nume === input1);
  
    if (!personData) {
      Alert.alert('Person not found!');
      return;
    }
  
    const logEntry = {
      CNP: (personData as any).CNP,
      DateTime: formattedDateTime,
      Direction: 'Intrare',
    };
  
    const logsRef = ref(database, 'Logs');
    const newLogRef = push(logsRef);
    await set(newLogRef, logEntry);
  
    Alert.alert('Logs have been sent!');
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
        <Text style={styles.label}>Nume si prenume</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={setInput1}
        />

        {/* Repeat the above pattern for the remaining textboxes */}

        <TouchableOpacity 
          style={styles.button}
          onPress={handleButton1Press}
        >
          <Text style={styles.buttonText}>
            Logs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleButton2Press}
        >
          <Text style={styles.buttonText}>
            Orar/Date ale utilizatorului/Stare poarta
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    marginTop: -345,
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
  label: {
    fontSize: 18,
    letterSpacing: 0,
    textAlign:"left",
    fontStyle: "normal",
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
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
