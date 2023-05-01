import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <View style = {styles.container}>
      <Text style={styles.text}>LOG IN</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#9F72CD',
        width: '100%',
        padding: 15,
        marginVertical: 5,
        
    },
    text: {
        textAlign:'center',
        color:'white',
        fontFamily: 'Poppins-Regular', 
    },
})

export default CustomButton