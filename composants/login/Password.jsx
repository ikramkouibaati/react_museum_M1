import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const Password = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleResetPassword = async () => {
     
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
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
          />
          <Button mode="contained" onPress={handleResetPassword}>
            Reset Password
          </Button>
        </View>
      </View>
    );
};

export default Password;