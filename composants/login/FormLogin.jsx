import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper'; 

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    if (email === 'admin@yahoo.fr' && password === 'azerty1234') {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('role', 'admin');
      console.log('ok admin');
      navigation.navigate('Main');

    } else if (email === 'redac@yahoo.fr' && password === 'azerty1234') {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('role', 'redacteur');
      console.log('ok redacteur');
      navigation.navigate('Main');
 
    } else {
      
      console.log('pas autorise');
    }
  };

  const handleForgotPassword = () => {
  
    navigation.navigate('PasswordOublie');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: '80%' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Se connecter
      </Button>
      <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={{ textAlign: 'center', marginTop: 10, color: 'blue' }}>
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
    </View>
  </View>
  );
};

export default Connexion;
