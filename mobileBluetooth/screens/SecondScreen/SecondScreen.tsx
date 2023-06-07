import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const logo = require('C:/Users/andre/Projects/MobileApp/proiectIP-Acces/android/app/icons/logo.png');

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
    <View style={styles.container}>
      <Image source={logo}></Image>
      <Text style={styles.label}>Nume si prenume</Text>
      <TextInput
        style={styles.input1}
        value={input1}
        onChangeText={setInput1}
      />

      {/* Repeat the above pattern for the remaining textboxes */}

      <View style={styles.buttonContainer}>
        <Button
          title="Logs" 
          onPress={handleButton1Press}
        />

        <Button
          title="Orar/Date ale utilizatorului/Stare poarta"
          onPress={handleButton2Press}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    position: "absolute",
    left:26,
    top:164,
    width:161,
    color: "rgba(0,0,0,1)",
    fontSize: 12,
    letterSpacing: 0,
    textAlign:"left",
    fontStyle: "normal",
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input1: {
    position: "absolute",
    fontSize: 12,
    left: 16,
    top: 185,
    width: 323,
    height: 33,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    position: "absolute",
    left: 53,
    top:550,
    width:102,
    height:40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOpacity:50,
    gap:100,
    marginTop: 16,
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
