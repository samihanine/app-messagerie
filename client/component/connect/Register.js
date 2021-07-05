import React from 'react'
import { View, TextInput, Button, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import axios from 'axios';
import {useState} from 'react';
import CicleIcon from '../utilities/CircleIcon';

const serv = "https://pristine-cuyahoga-valley-87633.herokuapp.com/";

export default function Login(props) {

  const [error,setError] = useState(false);

  const [pseudo,setPseudo] = useState("");
  const [mail,setMail] = useState("");
  const [mdp,setMdp] = useState("");
  const [mdp2,setMdp2] = useState("");
  const [description,setDescription] = useState("");

  const [myColor,setMyColor] = useState(0);
  const [myImage,setMyImage] = useState(0);
  


  const colorTab = ["000000","34CACC","88B40C","FF7518","F70003","DC57E2","FFDB00"];
  const imageTab = [
    "https://img.icons8.com/ios-glyphs/300/000000/user-male--v1.png",
    "https://img.icons8.com/ios-glyphs/300/000000/user-female--v1.png",
    "https://img.icons8.com/ios-glyphs/300/000000/cat.png",
    "https://img.icons8.com/ios-glyphs/300/000000/dog-sit.png",
    "https://img.icons8.com/ios-glyphs/300/000000/cute-hamster.png",
    "https://img.icons8.com/ios-glyphs/300/000000/bot.png"
  ];


  const signUser = () => {
    axios.post(serv + "signup", {
          pseudo: pseudo,
          mdp: mdp,
          mail: mail,
          image: imageTab[myImage].replace('000000', colorTab[myColor]),
          description: description
        })
    .then((response) => {
        console.log(response);
    });
  }

  const verify = () => {
    let nblettre = 4;

    if (mdp.length < nblettre) {
        setError("Votre mot de passe doit faire au minimum " +  nblettre + " lettre.");
        return
    }

    if (mdp !== mdp2) {
        setError("Les mots de passe saisies ne sont pas identiques.");
        return
    }

    if (!mail.includes(".") || !mail.includes("@")) {
        setError("Le format de votre email est invalide.");
        return
    }

    signUser();
  }


    return (
      <View style={styles.signup}>

        <View style={[styles.choose]}>

          <View style={styles.container}>
            <Text style={styles.text}>Personalisez votre profil</Text>
              <TextInput style={styles.input} onChangeText={(text) => setPseudo(text)} placeholder='Pseudo'/>
              <TextInput style={styles.input} onChangeText={(text) => setDescription(text)} placeholder='Description'/>
          </View>

          <View style={styles.container}>


            <Text style={styles.text}>Créer votre photo de profil</Text>
            <Text style={styles.text_2}>Chosissez une couleur :</Text>
            <View style={styles.color}>
              {colorTab.map((color,index)=>{
                return <TouchableOpacity onPress={() => setMyColor(index)} key={index} style={[{borderColor: myColor===index ? "black" : "#b4b4b4"},styles.color_items]}>
                  <View style={[{backgroundColor: "#" + color},styles.color_item]}></View>
                </TouchableOpacity>
              })}
            </View>

            <Text style={styles.text_2}>Chosissez une image :</Text>
            <View style={styles.color}>
              {imageTab.map((image,index)=>{
                return <TouchableOpacity onPress={() => setMyImage(index)} key={index} style={[{borderColor: myImage === index ? "black" : "#b4b4b4"},styles.color_items,styles.image_items]}>
                  <Image source={{uri: image}} style={[styles.image_item]}></Image>
                </TouchableOpacity>
              })}
            </View>

            <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
              <CicleIcon link={imageTab[myImage].replace('000000', colorTab[myColor])} />
            </View>

            

          </View>
          
          <View style={styles.container}>
            <Text style={styles.text}>Chosissez vos informations de connexion</Text>
            <TextInput style={styles.input} onChangeText={(text) => setMail(text)} placeholder='Adresse mail'/>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => setMdp(text)} placeholder='Mot de passe'/>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => setMdp2(text)} placeholder='Confirmer le mot de passe'/>
          </View>
          {error && <Text style={{color: "red", textAlign: "center"}}>{error}</Text>}
        </View>

        

        <Button title="S'inscrire" onPress={() => verify()}/>
      </View>
    )

}

const styles = StyleSheet.create({
  signup:{
    flex: 1,
    padding: 12,
    justifyContent: "space-evenly",
 

  },
  
  color:{
      flexDirection: "row",
      marginBottom: 10
      
  },

  color_items: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 2,
    margin: 2,

  },

  image_items: {

    alignItems: "center",
    justifyContent: "center",
  },

  color_item: {
    flex: 1,

  },

  image_item: {
    width: 30,
    height: 30,

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
title: {

  justifyContent: "center",
  alignItems: "center"
},
title_text: {
  
  fontSize: 17,

  borderRadius: 15,

  borderColor: "#ddd",
  padding: 5,
  color: "#2096F3",
  color: "rgba(0,0,0,0)",
},

text:{
  fontSize: 16,
  marginBottom: 7,
  marginTop: 2,
  textAlign: "center"
},
text_2: {
  color: "grey"
},
input: {
  marginBottom: 3,
  marginTop:3,
  fontSize: 15
}

})

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