import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { schemaOeuvres } from '../../verif/oeuvres';
import db from '../config';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const PostPeinture = () => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [auteur, setAuteur] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = () => {
    console.log(nom, description, image, auteur, dateCreation, userId);

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
      addDoc(collection(db, "oeuvres"), oeuvre);
    }
  }

  return (
    <View style={styles.container}>
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
        label="Date de création"
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
  )
}

export default PostPeinture;

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
});
