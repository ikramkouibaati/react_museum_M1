import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { schemaUsers } from '../../verif/oeuvres';
import db from '../config';
import { collection, addDoc } from 'firebase/firestore';

const PostUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    console.log(email, password, role);

    const user = {
      email,
      password,
      role,
    };

    const { error } = schemaUsers.validate(user, { abortEarly: false });

    console.log(error);

    if (!error) {
      addDoc(collection(db, "users"), user);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Rôle"
        value={role}
        onChangeText={text => setRole(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Créer
      </Button>
    </View>
  )
}

export default PostUser;

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
