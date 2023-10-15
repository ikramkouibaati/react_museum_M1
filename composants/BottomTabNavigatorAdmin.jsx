import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PeintureList from './front/PeintureList';
import GetAllpeinture from './back/GetAllpeinture';
import GetAllUsers from './back/GetAllUsers';

import PeintureById from './front/PeintureById';
import PostPeinture from './back/PostPeinture';
import PostUsers from './back/PostUsers';
import CreatepeintureByID from './front/CreatepeintureByID';



const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorAdmin() {
  
  return (
    
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
              navigation.navigate(route.name); // Utilisez `navigate` pour changer d'écran
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
    
  {/* if user =  admin */}


      <Tab.Screen
        name="Home ADMIN"
        component={GetAllpeinture}
        options={{
          tabBarLabel: 'Home ADMIN',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />

 
       <Tab.Screen
        name="Liste Users ADMIN"
        component={GetAllUsers}
        options={{
          tabBarLabel: 'Liste Users ADMIN',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="file" size={size} color={color} />;
          },
        }}
      />
      
     
      <Tab.Screen
        name="Déconnexion"
        component={GetAllUsers}
        options={{
          tabBarLabel: 'Déconnexion',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="logout" size={size} color={color} />;
          },
        }}
      />



    </Tab.Navigator>
  );
}

export const Routes = {
  PeintureById: PeintureById,
  PostPeinture: PostPeinture,
  PostUsers: PostUsers,
};
