import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import PeintureList from './front/PeintureList';
import GetAllpeinture from './back/GetAllpeinture';
import GetAllUsers from './back/GetAllUsers';

import PeintureById from './front/PeintureById';
import PostPeinture from './back/PostPeinture';
import PostUsers from './back/PostUsers';
import CreatepeintureByID from './front/CreatepeintureByID';
import Logout from './login/Logout';
import Profile from './front/Profile';
import Password from './login/Password';


const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.navigate(route.name);
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    )}
  >
    <Tab.Screen
      name="Home ADMIN"
      component={GetAllpeinture}
      options={{
        tabBarLabel: 'Home ADMIN',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Liste Users ADMIN"
      component={GetAllUsers}
      options={{
        tabBarLabel: 'Liste Users ADMIN',
        tabBarIcon: ({ color, size }) => (
          <Icon name="file" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Déconnexion"
      component={Logout}
      options={{
        tabBarLabel: 'Déconnexion',
        tabBarIcon: ({ color, size }) => (
          <Icon name="logout" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const RedacteurNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.navigate(route.name);
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    )}
  >
    <Tab.Screen
      name="Home"
      component={PeintureList}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Déconnexion"
      component={Logout}
      options={{
        tabBarLabel: 'Déconnexion',
        tabBarIcon: ({ color, size }) => (
          <Icon name="logout" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const BottomTabNavigator = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await AsyncStorage.getItem('role');
      setRole(userRole);
    };
    fetchRole();
  }, []);

  return (
    <>
      {role === 'admin' && <AdminNavigator />}
      {role === 'redacteur' && <RedacteurNavigator />}
    </>
  );
};

export default BottomTabNavigator;


export const Routes = {
  PeintureById: PeintureById,
  PostPeinture: PostPeinture,
  PostUsers: PostUsers,
  Password: Password,
};
