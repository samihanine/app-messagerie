import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

import Login from './component/connect/Login';
import SignUp from './component/connect/Register';

import PublicRoom from './component/home/PublicRoom';
import EditProfile from './component/home/UserProfile';
import PrivateRoom from './component/home/PrivateRoom';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {

  const [user, setUser] = useState(false);

  const PropLogin = () => {
    return <Login setUser={setUser}/>;
  }

  const PropSignUp = () => {
    return <SignUp/>
  }

  const PropPublicRoom = () => {
    return <PublicRoom user={user}/>;
  }

  const PropPrivateRoom = () => {
    return <PrivateRoom user={user}/>
  }

  const PropEditProfile = () => {
    return <EditProfile user={user}/>;
  }

  const Connect = () => {
    return <Tab.Navigator>
        <Tab.Screen name="Se connecter" component={PropLogin} options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="sign-in" size={size} color={color} />;
          }
        }}/>
        <Tab.Screen name="S'inscrire" component={PropSignUp} options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="id-card" size={size} color={color} />;
          }
            
        }}/>
    </Tab.Navigator>
  }

  const Home = () => {
    return <Tab.Navigator>
        <Tab.Screen name="Salons Publics" component={PropPublicRoom} options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="users" size={size} color={color} />;
          }
        }}/>
        <Tab.Screen name="Messages privés" component={PropPrivateRoom} options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="envelope" size={size} color={color} />;
          }
        }}/>
        <Tab.Screen name="Mon profil" component={PropEditProfile} options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="user-circle-o" size={size} color={color} />;
          }
        }}/>
    </Tab.Navigator>
  }

  return <NavigationContainer>

    {user ? <Home/> : <Connect />}
    
  </NavigationContainer>
}