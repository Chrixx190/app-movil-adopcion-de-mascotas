import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native'
import React from 'react'
import app from '../firebase/credenciales'
import { onAuthStateChanged,getAuth,updateProfile} from 'firebase/auth'


const auth = getAuth(app)




export default function ProfileSign ({ navigation }) {

  const [nombre,setNombre]= useState();
  const [telefono,setTelefono]=useState();

  function EnviarInfo(){
    updateProfile(auth.currentUser, {
      displayName: `${nombre}`, photoURL: `${telefono}` 
     }).then(() => {
      Alert.alert(
        "Guardado",
        "La informacion ha sido guardada correctamente",
      );
      navigation.navigate("AllNavigator");
     }).catch((error) => {
      Alert.alert(
        "Error",
        "Hubo un error al registrar la información",
      );
     });
    
   
  }
  

  return (
    <>
     <StatusBar style="auto" />
      <Text style={styles.tituloPrincipal}>Completa tu Perfil</Text>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu nombre completo'
            keyboardType='default'
            autoFocus={true}
            onChangeText={(text) => setNombre(text)}
            autoCorrect={false}
          />
          <Ionicons name="person-outline" style={{ fontSize: 25, color: '#F2D1D1', position: 'absolute', left: 20, top: 27 }} />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Ingresa tu numero celular'
            maxLength={10}
            keyboardType='number-pad'
            autoFocus={true}
            onChangeText={(text) => setTelefono(text)}
            autoCorrect={false}
          />
          <Ionicons name="phone-portrait-outline" style={{ fontSize: 25, color: '#F2D1D1', position: 'absolute', left: 20, top: 27 }} /> 
        </View>
        <View style={styles.btnCompleto}>
        <TouchableOpacity style={styles.botonGuardar} onPress={EnviarInfo}>
              <Text style={styles.textoBoton}>Guardar <Ionicons name="save-outline" style={{fontSize: 20 ,color:'white'}} /> </Text>
        </TouchableOpacity>
        </View>
       
      </ScrollView>
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
    inputContainer: {
      justifyContent: 'center',
    },
    input: {
      backgroundColor: 'white',
      paddingStart: 55,
      padding: 10,
      width: '100%',
      height: 50,
      marginTop: 15,
      borderRadius: 30,
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