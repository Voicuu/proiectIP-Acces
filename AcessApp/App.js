import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import { loadFonts } from './fonts';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={styles.container}>   
        <SignInScreen/> 
        {/* componenta de sign in este randata aici */}
          
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    display:'flex',
    
    padding: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6978',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
