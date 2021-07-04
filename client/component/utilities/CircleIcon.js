import React from 'react'
import { View, TextInput, Button, Text,StyleSheet, Image } from 'react-native'
import axios from 'axios';
import {useState} from 'react';

export default function CicleIcon(props) {
    const link = (props.link) ? props.link : "";
    const size = props.size ? props.size : 25;

    const styles = StyleSheet.create({
      image: {
        width: size,
        height: size,
      },
      
      div:{
        padding: "5px",
        borderColor: "#c2c2c2",
        borderWidth: 1,
        backgroundColor: "white",
        borderRadius: 50,
        padding: 10,
        width: size+22
      }
    })

    return (
      <View style={styles.div}>
        <Image source={{uri: link}} style={[styles.image, props.style]}></Image>
    </View>
    )

}

