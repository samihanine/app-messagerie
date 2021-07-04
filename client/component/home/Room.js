
import React from 'react'
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function PublicRoom(props) {

  const [rooms,setRooms] = useState(false);
  const navigation = props.navigation;

  const getPublicRoom = () => {
    axios.get("http://localhost:3000/publicroom")
    .then((response) => {
      if (response.data.message) {
        console.log(error)
      } else {
        setRooms(response.data);
      }
    });
  }

  const changeRoom = (room) => {
    props.setCurrentRoom(room);
    navigation.navigate('Messages');
  }

  const renderItem = ({ item }) => {
    item.image = (item.image == "" || !item.image) ? "https://img.icons8.com/ios-glyphs/300/000000/living-room.png" : item.image;

    return <TouchableOpacity style={styles.room} onPress={() => changeRoom(item)}>

          <Image source={{uri: item.image}} style={[styles.room_image]}></Image>

        <Text style={styles.room_text}>{item.name}</Text>
    </TouchableOpacity>
  }

  useEffect(() => {
    getPublicRoom();
  
    return () => {

    }
  }, [])


    return (
      <View>
        {rooms && <FlatList scrollEnabled={true} data={rooms} renderItem={renderItem} keyExtractor={item => item.id.toString()} />}
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