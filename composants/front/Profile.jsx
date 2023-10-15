import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet } from 'react-native';
import { TextInput, Button, Divider  } from 'react-native-paper';
import { schemaOeuvres } from '../../verif/oeuvres';
import db from '../config';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';



const Profile = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const getEmailAndRole = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedRole = await AsyncStorage.getItem('role');
      setEmail(storedEmail);
      setRole(storedRole);
    };
    getEmailAndRole();
  }, []);


  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [auteur, setAuteur] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [userId, setUserId] = useState("");


  const handleSubmit = () => {
    console.log(nom, description, image, auteur, dateCreation, userId);
    const formattedDate = new Date(dateCreation);
  
    const oeuvre = {
      nom,
      description,
      image,
      auteur,
      dateCreation: dateCreation,
      userId: userId
    };
  
    const { error } = schemaOeuvres.validate(oeuvre, { abortEarly: false });
  
    console.log(error);
  
    if (!error) {
      addDoc(collection(db, "oeuvres"), oeuvre)
        .then(() => {
        
          navigation.navigate('Home');
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  }
  

  return (
    <View style={styles.container}>
    <Text>Bienvenue, {email}</Text>
    <Text>Role: {role}</Text>
  
    <Divider style={styles.divider} /> 

    <Text>Ajouter une oeuvre</Text>
    <TextInput
      label="Nom"
      value={nom}
      onChangeText={text => setNom(text)}
      style={styles.input}
    />
    <TextInput
      label="Description"
      value={description}
      onChangeText={text => setDescription(text)}
      style={styles.input}
    />
    <TextInput
      label="Image"
      value={image}
      onChangeText={text => setImage(text)}
      style={styles.input}
    />
    <TextInput
      label="Auteur"
      value={auteur}
      onChangeText={text => setAuteur(text)}
      style={styles.input}
    />
    <TextInput
      label="Date de création ajouter -06-29T00:00:00.000Z apres l'année"
      value={dateCreation}
      onChangeText={text => setDateCreation(text)}
      style={styles.input}
    />
    <TextInput
      label="User ID"
      value={userId}
      onChangeText={text => setUserId(text)}
      style={styles.input}
    />
    <Button mode="contained" onPress={handleSubmit} style={styles.button}>
      Créer
    </Button>
  </View>
);
};


export default Profile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: 'gray', 
  },
});