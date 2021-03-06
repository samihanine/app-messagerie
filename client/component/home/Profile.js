import React from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';
import CicleIcon from '../utilities/CircleIcon';

const serv = "https://pristine-cuyahoga-valley-87633.herokuapp.com/";

export default function Profile(props) {
    const id = props.focusUser;

    const [infos, setInfos] = useState(false);
    const [nombre, setNombre] = useState(false);

    const getInfo = () => {
      axios.get(serv + "info?id=" + id)
      .then((response) => {
      if (response.data.message) {
          console.log(response.data.message);
      } else {
          setInfos(response.data[0]);
      }
      });
    }

    const getNombre = () => {
      axios.get(serv + "countmsg?id=" + id)
      .then((response) => {
      if (response.data.message) {
          console.log(response.data.message);
      } else {
        setNombre(response.data[0]["count(*)"])
      }
      });
    }

    useEffect(() => {
      getInfo();
      getNombre();
    
      return () => {

      }
    }, [])

    const newConv = () => {
      axios.post(serv + "newconversation", {
        participant1: props.user.id,
        participant2: infos.id,
      })
    .then((response) => {
      props.setRootNav(true)
      props.navigation.navigate('Messages privés', { screen: 'Messages Privées', test: "x" });
    });
    }

    return (
      <View style={{padding: 10, justifyContent: 'center', flex: 1}}>

        <View style={styles.container}>
          <Text style={{textAlign: 'center', fontSize: 20, color: "#4994ec", marginBottom: 20}}>{infos.pseudo}</Text>
          {infos.image && <CicleIcon size={70} link={infos.image}/>}
          
          <Text style={{color: 'grey', marginTop: 20}}>Total des messages envoyés: <Text style={{color: 'black'}}>{nombre}</Text></Text>
          {infos.creationdate && <Text style={{color: 'grey'}}>Date de création du compte: <Text style={{color: 'black'}}>{infos.creationdate}</Text></Text>}

        </View>

        <View style={styles.container}>
          <Text style={{color: 'grey', marginBottom:10}}>Description du profil:</Text>
          <Text style={{fontSize: 18}}>" {infos.description} "</Text>
        </View>

        <View style={styles.container}>
          {props.user.id != infos.id ?
            <Button title="Envoyer un message privé" onPress={newConv}/> :
            <Button title="Modifier votre profil" onPress={() => props.navigation2.navigate('Mon profil')}/>
          }
        </View>


      </View>
    )

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 12,
    marginBottom:10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
})