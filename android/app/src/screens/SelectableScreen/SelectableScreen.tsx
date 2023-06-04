import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the icons' image sources
const walkingIcon = require('../../../icons/walking.png');
const carIcon = require('../../../icons/car.png');

const { width, height } = Dimensions.get("window");

const SelectableScreen: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<'walking' | 'car' | null>(null);
  const navigation = useNavigation();

  const handleIconPress = (icon: 'walking' | 'car') => {
    setSelectedIcon(icon);
    //@ts-ignore
    navigation.navigate('Details', { icon });
    // to be implemented - value1 for walking/value2 for car
  };

  return (
    
    <View style={styles.container}>
    
      <TouchableOpacity
        style={[styles.iconWrapper, selectedIcon === 'walking' && styles.selectedIcon]}
        onPress={() => handleIconPress('walking')}
      >
        <Image source={walkingIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconWrapper, selectedIcon === 'car' && styles.selectedIcon]}
        onPress={() => handleIconPress('car')}
      >
        <Image source={carIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>Selectati modalitatea de acces</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: width / 2.2,
    height: height / 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  selectedIcon: {
    borderColor: 'lightblue',
    borderWidth: 2,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text:{
  color: 'black',
  fontSize:20,
  marginTop:40,
  },
});

export default SelectableScreen;
