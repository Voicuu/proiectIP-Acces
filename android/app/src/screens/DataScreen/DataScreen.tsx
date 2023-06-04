import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from '../../../../../firebase'; // Replace this with the path to your Firebase configuration file
import { app } from '../../../../../firebase';
import { Card } from 'react-native-elements';

interface Person {
  Nume: string;
  CNP: string;
  CodSecuritate: string;
  Divizia: string;
  DreptAcces: string;
  Email: string;
  NrLegitimatie: string;
  NrMasina: string;
  Poza: string;
  Imei: string;
  // Add any other fields that a person might have
}

const DataScreen = () => {
  const [data, setData] = useState<Person[]>([]); 

  useEffect(() => {
    const database = getDatabase(app);
    const dataRef = ref(database, 'Angajati'); 
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <ScrollView>
      {Object.values(data).map((person, index) => (
//@ts-ignore
        <Card key={index}>
          
          <Card.Title>{person.Nume}</Card.Title>
          <Card.Divider/>
          <View>
          <Image source={{uri: person.Poza}} style={styles.image} /> 
          <Text style={styles.text}>CNP: {person.CNP}</Text>
          <Text style={styles.text}>Cod Securitate: {person.CodSecuritate}</Text>
          <Text style={styles.text}>Divizia: {person.Divizia}</Text>
          <Text style={styles.text}>Drept Acces: {person.DreptAcces}</Text>
          <Text style={styles.text}>Email: {person.Email}</Text>
          <Text style={styles.text}>Numar Legitimatie: {person.NrLegitimatie}</Text>
          <Text style={styles.text}>Numar Masina: {person.NrMasina}</Text>
          
          <Text style={styles.text}>Cod Imei: {person.Imei}</Text>
            {/* Add more details as needed */}
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5
    // Add more styles as needed
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop:10,
    alignSelf: 'center'
    // Add more styles as needed
  },
  // Add more styles as needed
});

export default DataScreen;
