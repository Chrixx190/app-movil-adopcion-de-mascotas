import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import app from '../firebase/credenciales'
import { collection, onSnapshot, orderBy, query, where, getFirestore } from 'firebase/firestore';
const firestore = getFirestore(app);

import {getAuth} from 'firebase/auth';

const auth = getAuth(app);


export default function Solicitudes() {



var user = auth.currentUser;

const [solicitudes, setSolicitudes] = useState([]);
useEffect(() => {
const collectionRef = collection(firestore, 'Solicitudes');
const q = query(collectionRef, where("emailSolicitante", "==", user.email));

const unsubscribe = onSnapshot(q, querySnapshot => {
    console.log('querySnapshot unsusbscribe');
    setSolicitudes(
        querySnapshot.docs.map(doc => ({
            id: doc.id, 
            nombre: doc.data().nombrePerro,
            estado: doc.data().validacionSolicitud,
        }))
      );
    });
return unsubscribe;
},[])
  
  return (
    <>
      <Text style={styles.tituloPrincipal}>Solicitudes</Text>
      <ScrollView style={styles.container}>
       {solicitudes.map(soli =>
        <View style={styles.mainContainer}>
        <View style={styles.contenedor}>
         <Text style={styles.tituloNombre}>Nombre de la mascota:</Text>
         <Text style={styles.nombre}>{soli.nombre}</Text>
         <Text style={styles.tituloNombre}>Id Solicitud:</Text>
         <Text style={styles.nombre}>{soli.id}</Text>
         {soli.estado ? (
          <View style={styles.infoAprobado}>
          <Text style={{color: '#F9F9F9', fontSize: 20, fontWeight: 'bold'}}>APROBADO <Ionicons name="checkmark-circle" style={{color: '#F9F9F9', fontSize: 20}} /></Text>
         </View>
         ): (
          <View style={styles.infoPendiente}>
          <Text style={{color: '#F9F9F9', fontSize: 20, fontWeight: 'bold'}}>PENDIENTE <Ionicons name="time" style={{color: '#F9F9F9', fontSize: 20}} /></Text>
         </View>
         )}
         
        </View>
      </View>
      )}
          
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
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: 280,
    marginTop: 10,
  },
  contenedor:{
    padding: 20,
  },
  tituloNombre: {
    fontSize: 25,
    color: '#C9BBCF',
    fontWeight: 'bold',
  },
  nombre:{
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2C3639',
    paddingVertical: 6,
    paddingBottom: 30,
  },
  infoAprobado:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A5C9CA',
    height: 45,
    borderRadius: 50,
  },
  infoPendiente:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5B4',
    height: 45,
    borderRadius: 50,
  },
});