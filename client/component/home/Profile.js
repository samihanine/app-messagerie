import React from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';
import CicleIcon from '../utilities/CircleIcon';

export default function ShowProfile(props) {
    const id = props.focusUser;

    const [infos, setInfos] = useState(false);
    const [nombre, setNombre] = useState(false);

    const getInfo = () => {
      axios.get("http://localhost:3000/info?id=" + id)
      .then((response) => {
      if (response.data.message) {
          console.log(response.data.message);
      } else {
        response.data[0].creationdate = formattedDate(new Date(response.data[0].creationdate));
          setInfos(response.data[0]);
          console.log(response.data[0])

      }
      });
    }

    const getNombre = () => {
      axios.get("http://localhost:3000/countmsg?id=" + id)
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
      axios.post("http://localhost:3000/newconversation", {
        participant1: props.user.id,
        participant2: infos.id,
      })
    .then((response) => {
        console.log(response);

    });
    }

    return (
      <View style={{padding: 10, justifyContent: 'center', flex: 1}}>

        <View style={styles.container}>
          <Text style={{textAlign: 'center', fontSize: 20, color: "#5ac2d5", marginBottom: 20}}>{infos.pseudo}</Text>
          <CicleIcon size={70} link={infos.image}/>
          
          <Text style={{color: 'grey', marginTop: 20}}>Total des messages envoyés: <Text style={{color: 'black'}}>{nombre}</Text></Text>
          <Text style={{color: 'grey'}}>Date de création du compte: <Text style={{color: 'black'}}>{infos.creationdate}</Text></Text>

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

function formattedDate(d = new Date) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}