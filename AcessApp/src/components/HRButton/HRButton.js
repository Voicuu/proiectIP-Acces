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
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
    text: {
        textAlign:'center',
        color:'white',
        fontFamily: 'Poppins-Regular', 
    },
})

export default HRButton