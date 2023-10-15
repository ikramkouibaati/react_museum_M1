import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator, { Routes } from './composants/BottomTabNavigator'; 
import LoginForm from './composants/login/FormLogin'; 

const Stack = createStackNavigator();

const App = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
     
        <Stack.Screen
          name="OeuvreDetail"
          component={Routes.PeintureById}
          options={{ title: "Détails de l'oeuvre" }}
        />
        <Stack.Screen
          name="PostPeinture"
          component={Routes.PostPeinture}
          options={{ title: 'Ajouter une peinture' }}
        />
        <Stack.Screen
          name="PostUsers"
          component={Routes.PostUsers}
          options={{ title: 'Ajouter un utilisateur' }}
        />
       
       <Stack.Screen
          name="PasswordOublie"
          component={Routes.Password}
          options={{ title: 'password oublié' }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};


export default App;
