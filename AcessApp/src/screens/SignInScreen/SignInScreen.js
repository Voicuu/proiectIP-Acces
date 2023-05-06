import { View, Text, Image, StyleSheet,useWindowDimensions} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import HRButton from '../../components/HRButton/HRButton';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import HRIcon from '../../components/HRIcon/HRIcon';
const SignInScreen = () => {
    const {height}=useWindowDimensions();
  return (
    <View style={styles.container}>
      {/* <HRButton style={styles.button}/> */}
      <HRIcon></HRIcon>
      <Image source={Logo} style={[styles.logo,{height:height * 0.3}]}  />
      
      <Text style={styles.text}>Acces Poarta</Text>

      <CustomInput style={styles.input}/>
     
      <CustomButton style= {styles.button}/>
      <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
      <Text style={styles.info}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</Text>
    </View>
  );
};

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

export default SignInScreen