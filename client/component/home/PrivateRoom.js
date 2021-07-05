import React from 'react'
import { View, TextInput, Button, Text, FlatList } from 'react-native'
import axios from 'axios';
import {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Conversation from './Conversation';
import Message from './Message';
import Profile from './Profile';


const Stack = createStackNavigator();

export default function MyStack(props) {
  console.log(props)
  const [currentConv,setCurrentConv] = useState(false);
  const [focusUser, setFocusUser] = useState(false);

    const PropMessage = ({ navigation }) => {
      return <Message setFocusUser={setFocusUser} currentConv={currentConv} navigation={navigation} user={props.user}/>
    }

    const PropConversation = ({ navigation }) => {
      return <Conversation setCurrentConv={setCurrentConv} navigation={navigation} user={props.user}/>
    }

    const PropProfile = ({ navigation }) => {

      return <Profile focusUser={focusUser} navigation2={props.navigation} navigation={navigation} user={props.user}/>
    }

    return (
      
      <Stack.Navigator>
        <Stack.Screen name="Messages Privées" component={PropConversation} />
        <Stack.Screen name="Messages" component={PropMessage} />
        <Stack.Screen name="Profile" component={PropProfile} />
      </Stack.Navigator>
    );
  }