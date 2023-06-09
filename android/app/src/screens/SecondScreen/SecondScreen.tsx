import React, { useState } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const logo = require('../../../icons/logo.png');


const SecondScreen = () => {
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
  };

  const handleButton2Press = () => {
    // Handle button 2 press logic here
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
