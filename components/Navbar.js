import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Home")}>
            <Ionicons name='home' style={styles.icono}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Solicitudes")}>
            <Ionicons name='paw' style={styles.icono}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Perfil")}>
            <Ionicons name='person-circle-outline' style={styles.icono}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navContainer:{
        position: 'absolute',
        alignItems: 'center',
        bottom: 20,
    },
    navBar:{
        flexDirection: 'row',
        backgroundColor: 'red',
        width: '90%',
        justifyContent: 'space-evenly',
        borderRadius: 40,
    },
    icono:{
        fontSize: 35,
        color: 'white',
    },
    boton:{
        padding: 11,
    },
})