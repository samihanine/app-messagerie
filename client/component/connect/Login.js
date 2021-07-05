import React from 'react'
import { ActivityIndicator, View, TextInput, Button, Text, StyleSheet } from 'react-native'
import axios from 'axios';
import {useState} from 'react';

const serv = "https://pristine-cuyahoga-valley-87633.herokuapp.com/";

export default function Login(props) {

  const [pseudo,setPseudo] = useState("");
  const [mdp,setMdp] = useState("");
  const [error,setError] = useState(false);

  const [loading,setLoading] = useState(false);

  const getUser = () => {
    setLoading(true);
    axios.post(serv + 'login', {
          pseudo: pseudo,
          mdp: mdp,
        })
    .then((response) => {
      setLoading(false);

      if (response.data.message) {
        setError(response.data.message);
      } else {
        props.setUser(response.data);
      }
      
    });
  }

    return (
      <View style={styles.login}>
        
        {loading ? <ActivityIndicator size="large" /> :
        <View style={styles.container}>

          <View style={styles.input}>
            <Text style={{fontSize: 17, marginBottom: 20, textAlign: "center"}}>Connectez vous !</Text>

            <TextInput style={{fontSize: 15, marginBottom: 10}} onChangeText={(text) => setPseudo(text)} placeholder='Pseudo'/>
            <TextInput style={{fontSize: 15, marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setMdp(text)} placeholder='Mot de passe'/>

            {error && <Text style={{color: "red", textAlign: "center", paddingBottom: 10}}>{error}</Text>}
          </View>


          <Button title='Se connecter' onPress={getUser}/>
        </View>
        }

      </View>
    )

}

const styles = StyleSheet.create({
  login:{
    flex:1,
    padding: 10,
    justifyContent: "center"

  },

  container: {
    backgroundColor: "white",
    padding: 8,
    marginBottom:10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%"

  },

  input:{
    borderBottomColor: "#ddd",
    borderBottomWidth: 1
  }
})