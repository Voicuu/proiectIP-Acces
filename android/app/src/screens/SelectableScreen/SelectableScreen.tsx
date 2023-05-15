import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the icons' image sources
const walkingIcon = require('C:/Users/andre/Projects/MobileApp/proiectIP-Acces/android/app/icons/walking.png');
const carIcon = require('C:/Users/andre/Projects/MobileApp/proiectIP-Acces/android/app/icons/car.png');

const SelectableScreen: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<'walking' | 'car' | null>(null);
  const navigation = useNavigation();

  const handleIconPress = (icon: 'walking' | 'car') => {
    setSelectedIcon(icon);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
  selectedIcon: {
    backgroundColor: 'lightblue',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default SelectableScreen;