import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React from 'react'
import app from '../firebase/credenciales'
import { onAuthStateChanged,getAuth, signOut } from 'firebase/auth'
import {collection, addDoc, setDoc, doc, getFirestore} from 'firebase/firestore'
const auth = getAuth(app)
const firestore = getFirestore(app)


export default function Perfil() {

  //tomamos la informacion del usuario que esta registrado
  const [usuario, setUsuario] = useState();
  const [nombre, setNombre] = useState();
  const [celular, setCelular]= useState();
  const [email, setEmail] = useState();
  onAuthStateChanged(auth, currentUser =>{
    setUsuario(currentUser.uid);
    setEmail(currentUser.email);
    setNombre(currentUser.displayName);
    setCelular(currentUser.photoURL);

  }); 

  

const CerrarSesion = () => {
  signOut(auth);
}

  return (
    <>
      <Text style={styles.tituloPrincipal}>Perfil</Text>
     
      <View style={styles.container}>
        <View style={styles.informacion}>
          <Text style={styles.txtitulo}>Nombre: </Text>
          <Text style={styles.txtinfo}>{nombre}</Text>
          <Text style={styles.txtitulo}>Email: </Text>
          <Text style={styles.txtinfo}>{email}</Text>
          <Text style={styles.txtitulo}>Celular:</Text>
          <Text style={styles.txtinfo}>{celular}</Text>
        </View>
        <View style={styles.btnCompleto}>
        <TouchableOpacity style={styles.botonGuardar} onPress={CerrarSesion}>
              <Text style={styles.textoBoton}>Salir <Ionicons name="log-out-outline" style={{fontSize: 20 ,color:'white'}} /> </Text>
        </TouchableOpacity>
        </View>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
  tituloPrincipal: {
    top: 35,
    left: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#F2D1D1',
  },
  container: {
    top: 40,
    marginHorizontal: 20,
  },
  informacion: {
    marginTop: 10,
  },
  txtitulo:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C9BBCF',
  },
  txtinfo:{
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2C3639',
    paddingVertical: 10,
  },
  btnCompleto:{
    alignItems: 'center',
    marginTop: 15,
  },
  botonGuardar:{
    backgroundColor: '#F2D1D1',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textoBoton:{
    fontSize: 20,
    color: 'white',
  }
  
});