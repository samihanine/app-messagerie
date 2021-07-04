import React from 'react'
import { View, TextInput, Button, Text, FlatList, Image, StyleSheet,TouchableOpacity } from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";
import CicleIcon from '../utilities/CircleIcon';

export default function Login(props) {
    const user = props.user;
    const currentConv = props.currentConv;
    const navigation = props.navigation;

    const [messages,setMessages] = useState(false);
    const [text,setText] = useState("");

    const getMessages = () => {
        axios.get("http://localhost:3000/privatemessage?id=" + currentConv.id)
        .then((response) => {
        if (response.data.message) {
            console.log(response.data.message);
        } else {
            response.data.sort(function(a,b){
                return new Date(a.senddate) - new Date(b.senddate);
            });
            setMessages(response.data);
        }
        });
    }

    const sendMessage = () => {
        setText("");
        axios.post("http://localhost:3000/newmessage", {
            text: text,
            convid: currentConv.id,
            userid: user.id
          })
        .then((response) => {
            console.log(response);
            getMessages();
        });
    }

    const verify = () => {
        if (text != "") {
            sendMessage();
        }
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
                <Text style={[styles.message_text,other ? styles.other_message_text : styles.user_message_text]}>{item.text}</Text>
            </View>
            
            
        </View>
    }

    useEffect(() => {
        getMessages();
      
        return () => {
          // console.log("au revoir");
        }
    }, [])

    return (
      <View style={styles.salon}>

        {messages && <AutoScrollFlatList style={styles.all_messages} data={messages} renderItem={renderItem} keyExtractor={item => item.id.toString()} />}

        <View style={styles.send}>
            <TextInput style={styles.send_input} value={text} onChangeText={(text) => setText(text)} placeholder='Ecrivez votre message'/>
            <TouchableOpacity style={styles.send_divimage} onPress={() => verify()}>
                <Image style={styles.send_image} source={{uri:"https://img.icons8.com/ios-filled/300/5ac2d5/paper-plane.png"}}></Image>
            </TouchableOpacity>
        </View>

      </View>
    )

    // <Button title="Envoyer" onPress={() => verify()}/>

}

// Components/Search.js

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
        flex: 1,
    },

    send: {
        flexDirection: 'row',
        borderTopColor: "#ddd",
        borderTopWidth: 1,
        backgroundColor: "white"
    },  
    send_image: {
        width: "30px",
        height: "30px",
        
    },
    send_input: {
        width: "100%",
        paddingLeft: 10
    },
    send_divimage:{
        padding: "10px",
        borderLeftColor: "#ddd",
        borderLeftWidth: 1
    },

    message:{
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end'
    },
    message_text: {
        width: "200px",
        borderRadius: 10,
        marginBottom: 5,
        padding: 5,
        borderColor: "#c2c2c2",
        borderWidth: 1
    },
    message_divimage:{
        padding: "5px",
        borderColor: "#c2c2c2",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 50,
        marginRight: "8px",
        marginLeft: "8px"
    },
    message_image : {
        width: "30px",
        height: "30px",

    },

    message_pseudo: {
        textAlign: "left",

        fontSize: 12,
        color: "grey"
    },

    message_profil: {

    },

    other_message: {
        
    },
    user_message: {
        marginLeft: "calc(100% - 250px)",
        flexDirection: 'row-reverse'
    },
    other_message_text: {
        backgroundColor: "white",
        borderBottomLeftRadius: 0,
 
    },
    user_message_text: {
        backgroundColor: "#5ac2d5",
        borderBottomRightRadius: 0,
        color: "white"
    },
  })