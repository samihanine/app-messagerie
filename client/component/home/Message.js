import React from 'react'
import { View, TextInput, Button, Text, FlatList, Image, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";
import CicleIcon from '../utilities/CircleIcon';

const serv = "https://pristine-cuyahoga-valley-87633.herokuapp.com/";

export default function Login(props) {
    const user = props.user;
    const currentRoom = props.currentRoom;
    const currentConv = props.currentConv;
    const navigation = props.navigation;

    const [messages,setMessages] = useState(false);
    const [text,setText] = useState("");
    const [loading,setLoading] = useState(false);

    const getMessages = () => {
        
        const url = currentRoom ? serv + "message?id=" + currentRoom.id : serv + "privatemessage?id=" + currentConv.id;

        axios.get(url)
        .then((response) => {
            setLoading(false);
        if (response.data.message) {
            console.log(response.data.message);
        } else {
            setMessages(response.data);
        }
        });
    }

    const sendMessage = () => {
        setText("");
        axios.post(serv + "newmessage", {
            text: text,
            roomid: currentRoom ? currentRoom.id : 0,
            convid: currentConv ? currentConv.id : 0,
            userid: user.id
          })
        .then((response) => {
            getMessages();
        });
    }

    const goProfile = (id) => {
        props.setFocusUser(id);
        navigation.navigate('Profile');
    }

    const renderItem = ({ item }) => {
        item.image = item.image ? item.image : "https://img.icons8.com/ios-glyphs/300/000000/user-male--v1.png";
        var other = (user.id !== item.userid);

        return <View style={[styles.message, other ? styles.other_message : styles.user_message]}>
            <View style={styles.message_profil}>
                <TouchableOpacity onPress={() => goProfile(item.userid)} style={{margin: 4, marginBottom: 0, marginTop: 8}}>
                    <CicleIcon link= {item.image}/>
                </TouchableOpacity>
                
            </View>
            <View>
                <Text style={[styles.message_pseudo,!other && {textAlign: "right"}]}>{item.pseudo}</Text>
                <View style={[{backgroundColor: other ? "white" : "#44b3fb"},styles.message_text,other ? {borderBottomLeftRadius:0} : {borderBottomRightRadius:0} ]}>
                <Text >{item.text}</Text>
            </View>
                
            </View>
            
            
        </View>
    }

    useEffect(() => {
        setLoading(true);
        getMessages();
      
        return () => {
          // console.log("au revoir");
        }
    }, [])

    return (
      <View style={styles.salon}>
        {currentRoom && <Text style={styles.description}>{currentRoom.name}: {currentRoom.description}</Text>}
        
        <View style={{flex: 1}}>
            {loading ? <ActivityIndicator style={{flex: 1}} size="large"/> :

            messages && <AutoScrollFlatList style={styles.all_messages} data={messages} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
            }
        </View>

        <View style={styles.send}>
            <TextInput multiline style={styles.send_input} value={text} onChangeText={(text) => setText(text)} placeholder='Ecrivez votre message'/>
            <TouchableOpacity style={styles.send_divimage} onPress={() => text != "" && sendMessage()}>
                <Image style={styles.send_image} source={{uri:"https://img.icons8.com/ios-filled/300/4994ec/paper-plane.png"}}></Image>
            </TouchableOpacity>
        </View>

      </View>
    )
}

const styles = StyleSheet.create({
    salon:{
        flex: 1,
        backgroundColor:"#EFF0F1",
        
    },
    description: {
        backgroundColor: "white",
        padding:5,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1
    },
    all_messages:{
        flex: 1
    },

    send: {
        flexDirection: 'row',
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        backgroundColor: "white"
    },  
    send_image: {
        width: 30,
        height: 30,
        
    },
    send_input: {
        flex:1,
        paddingLeft: 10
    },
    send_divimage:{
        padding: 10,
        borderLeftColor: "#ddd",
        borderLeftWidth: 1
    },

    message:{
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end'
    },
    message_text: {
        width: 200,
        
        marginBottom: 5,
        padding: 5,
        borderColor: "#c2c2c2",
        borderWidth: 1,

        color: "white",
  
        borderRadius: 10,

    },
    message_divimage:{
        padding: 5,
        borderColor: "#c2c2c2",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 50,
        marginRight: 8,
        marginLeft: 8
    },
    message_image : {
        width: 30,
        height: 30,

    },

    message_pseudo: {
        textAlign: "left",

        fontSize: 12,
        color: "grey"
    },

    user_message: {
        
        flexDirection: 'row-reverse'
    },
  })