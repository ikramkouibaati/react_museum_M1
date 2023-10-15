import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({ navigation }) => {
  useEffect(() => {
    const handleLogout = async () => {
      await AsyncStorage.removeItem('role'); // Remove the role from AsyncStorage
      navigation.navigate('Login'); // Navigate to the login screen (or wherever you want to go after logout)
    };

    handleLogout();
  }, [navigation]);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
};

export default Logout;
