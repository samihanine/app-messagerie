import React from 'react'
import { View, TextInput, Button, Text, StyleSheet } from 'react-native'
import axios from 'axios';
import {useState, useEffect} from 'react';
import CicleIcon from '../utilities/CircleIcon';

const serv = "https://pristine-cuyahoga-valley-87633.herokuapp.com/";

export default function EditProfile(props) {
    const user = props.user;

    const [infos, setInfos] = useState(false);
    const [nombre, setNombre] = useState(false);


    const [description, setDescription] = useState(user.description);
    const [pseudo, setPseudo] = useState(user.pseudo);
    

    const getNombre = () => {
      axios.get(serv + "countmsg?id=" + user.id)
      .then((response) => {
      if (response.data.message) {
          console.log(response.data.message);
      } else {
        setNombre(response.data[0]["count(*)"])
      }
      });
    }

    useEffect(() => {
      getNombre();
    
      return () => {

      }
    }, [])

    return (
      <View style={{padding: 10, justifyContent: 'center', flex: 1}}>

        <View style={styles.container}>
          <TextInput value={pseudo} onChangeText={(text) => setPseudo(text)} style={{textAlign: 'center', fontSize: 20, color: "#4994ec", marginBottom: 20}}/>
          <CicleIcon size={70} link={user.image}/>
          
          <Text style={{color: 'grey', marginTop: 20}}>Total des messages envoyés: <Text style={{color: 'black'}}>{nombre}</Text></Text>
          <Text style={{color: 'grey'}}>Date de création du compte: <Text style={{color: 'black'}}>{user.creationdate}</Text></Text>
        </View>

        <View style={styles.container}>
          <Text style={{color: 'grey', marginBottom:10}}>Description du profil:</Text>
          <TextInput value={description} onChangeText={(text) => setDescription(text)} style={{fontSize: 18, width: "100%"}}/>
        </View>

        <View style={styles.container}>
          <Button title="Me déconnecter" onPress={() => props.setUser(false)}/>
          <View style={{height:10}}></View>
          <Button color="#ff5c5c" title="Supprimer mon compte" onPress={() => {}}/>
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