
import React from 'react'
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function Conversation(props) {

  const [convs,setConvs] = useState(false);
  const [infos,setInfos] = useState(false);
  const navigation = props.navigation;

  const getConversation = () => {
    axios.get("http://localhost:3000/conversation?id=" + props.user.id)
    .then((response) => {
      if (response.data.message) {
        console.log(error)
      } else {
        setConvs(response.data);
  
        console.log(response.data)
      }
    });
  }

  const changeRoom = (conv) => {
    props.setCurrentConv(conv);
    navigation.navigate('Messages');
  }

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.room} onPress={() => changeRoom(item)}>

          <Image source={{uri: item.image}} style={[styles.room_image]}></Image>

        <Text style={styles.room_text}>{item.pseudo}</Text>
    </TouchableOpacity>
  }

  useEffect(() => {
    getConversation();
  
    return () => {

    }
  }, [])

  // 
    return (
      <View>
        {convs && <FlatList scrollEnabled={true} data={convs} renderItem={renderItem} keyExtractor={item => item.id.toString()} />}
      </View>
    )

}

const styles = StyleSheet.create({
  room: {
    flex:1,
    backgroundColor: "white",
    padding: 10,
    borderWidth:1,
    borderColor: "#ddd",
    margin: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center"
  },


  room_image: {
    width: 40,
    height: 40
  },

  room_text: {
    marginLeft: 8,
    fontSize: 16,

  }
})