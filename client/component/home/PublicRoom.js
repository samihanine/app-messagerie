import React from 'react'
import { View, TextInput, Button, Text, FlatList } from 'react-native'
import axios from 'axios';
import {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Room from './Room';
import Message from './Message';
import Profile from './Profile';

const Stack = createStackNavigator();

export default function MyStack(props) {

  const [currentRoom,setCurrentRoom] = useState(false);
  const [focusUser, setFocusUser] = useState(false);

    const PropMessage = ({ navigation }) => {
      return <Message setFocusUser={setFocusUser} currentRoom={currentRoom} navigation={navigation} user={props.user}/>
    }

    const PropRoom = ({ navigation }) => {
      return <Room setCurrentRoom={setCurrentRoom} navigation={navigation} user={props.user}/>
    }

    const PropProfile = ({ navigation }) => {
      return <Profile focusUser={focusUser} navigation2={props.navigation} navigation={navigation} user={props.user}/>
    }

    return (
      <Stack.Navigator>
        <Stack.Screen name="Salons Publics" component={PropRoom} />
        <Stack.Screen name="Messages" component={PropMessage} />
        <Stack.Screen name="Profile" component={PropProfile} />
      </Stack.Navigator>
    );
  }