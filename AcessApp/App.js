import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';





export default function App() {
  return (
    <View style={styles.container}>   
        <SignInScreen/> 
        {/* componenta de sign in este randata aici */}
          
      <StatusBar style="auto" />
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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subTitle: {
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
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});