import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>LOG IN</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9F72CD',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    textAlign:'center',
    color:'white',
    fontFamily: 'Poppins-Regular', 
  },
})

export default CustomButton
