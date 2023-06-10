import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BluetoothScreenArduino from '../BluetoothScreenArduino/BluetoothScreenArduino';
import BluetoothScreenDesktop from '../BluetoothScreenDesktop/BluetoothScreenDesktop';
// Define the icons' image sources
const walkingIcon = require('../../../icons/walking.png');
const carIcon = require('../../../icons/car.png');
const logo = require('../../../icons/logo.png');

const SelectableScreen: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<'walking' | 'car' | null>(null);
  const navigation = useNavigation();

  const handleIconPress = (icon: 'walking' | 'car') => {
    setSelectedIcon(icon);
    
    if (icon === 'walking') {
      //@ts-ignore
      navigation.navigate('BluetoothScreenDesktop');
    } else if (icon === 'car') {
      //@ts-ignore
      navigation.navigate('BluetoothScreenArduino');
    }
  };

  return (
    <ImageBackground
      source={require('../../../icons/background.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.logoStyle}></Image>
        
        <Text 
          style={styles.textStyle}
          numberOfLines={1}
        >
          Cum doriti sa intrati?
        </Text>

        <TouchableOpacity
          style={[styles.iconWrapper, selectedIcon === 'walking' && styles.selectedIcon]}
          onPress={() => handleIconPress('walking')}
        >
          <Image source={walkingIcon} style={styles.icon} />
        </TouchableOpacity>

        <Text 
          style={styles.textStyle} 
          numberOfLines={1}
        >
          Intrare pe jos
        </Text>

        <TouchableOpacity
          style={[styles.iconWrapper, selectedIcon === 'car' && styles.selectedIcon]}
          onPress={() => handleIconPress('car')}
        >
          <Image source={carIcon} style={styles.icon} />
        </TouchableOpacity>

        <Text 
          style={styles.textStyle} 
          numberOfLines={1}
        >
          Intrare cu masina
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
    marginHorizontal: 10,
    marginBottom: 15
  },
  selectedIcon: {
    backgroundColor: 'lightblue',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 20,
    width: 250,
    textAlign: 'center',
    flex: 1
  },
  logoStyle: {
    marginTop: 25,
    marginBottom: 25,
  },
});

export default SelectableScreen;