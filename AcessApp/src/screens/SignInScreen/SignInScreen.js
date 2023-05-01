import { View, Text, Image, StyleSheet,useWindowDimensions} from 'react-native'

import React from 'react'
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
const SignInScreen = () => {
    const {height}=useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image source={Logo} style={[styles.logo,{height:height * 0.3}]}  />

      <CustomInput style={styles.input}/>
      <CustomButton style= {styles.button}/>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width:'100%',
      flex: 1,
      alignItems: 'center',
      
     
     ///justifyContent: 'center',
    },
    logo: {
    
      width: 200,
      maxWidth: 300,
      maxHeight: 200,
      
       
    },
    input:{
        flex :1,
        widht: '100%',
        
        
    },
    button:{
        flex: 1,
        widht: '100%',
        
    },
  });

export default SignInScreen