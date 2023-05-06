import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const HRButton = () => {
  return (
    <View style = {styles.container}>
      <Text style={styles.text}>SWITCH TO HR</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        
        right: 0,
        backgroundColor: 'black',
        width: '30%',
        padding: 5,
       
    },
    text: {
        textAlign:'center',
        color:'white',
        fontFamily: 'Poppins-Regular', 
    },
})

export default HRButton