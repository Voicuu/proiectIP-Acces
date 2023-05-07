import { Text, View, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import CustomInput from '../../components/CustomInput/CustomInput';
import HRIcon from '../../components/HRIcon/HRIcon';
import Logo from '../../../assets/images/logo.png';

  const HRScreen=() => {
    return (
      <View style={styles.container}>
         <HRIcon></HRIcon>
      <Image source={Logo} style={styles.logo}  />
      <Text style={styles.text}>Acces Poarta HR</Text>
      <CustomInput style={styles.input}/>
      <CustomButton style={styles.button}/>
      </View>
    )
  }
  const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
    logo: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 60,
        maxWidth: 200,
        maxHeight: 60,
    },
    input: {
        flex: 1,
        width: '100%',
    },
    button: {
        flex: 1,
        width: '100%',
    },
    text: {
      textAlign:'center',
      fontSize:50,
      marginBottom:10,
      fontFamily: 'Poppins-Regular',
      color:'#E3E3E3',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    info:
    {
      marginTop:10,
      textAlign:'center',
      fontSize:14,
      fontFamily: 'Poppins-Regular',
      color:'grey',
      textShadowRadius: 2,
    },  
  });

export default HRScreen