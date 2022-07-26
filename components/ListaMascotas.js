import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState, useEffect} from "react";
import app from '../firebase/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {collection,addDoc , getDoc, setDoc, doc, getFirestore} from 'firebase/firestore';

const auth = getAuth(app);
const firestore = getFirestore(app);


const ListaMascotas = () => {

  const fakeData = [
    { id: 1, urimagenurl: "https://images.unsplash.com/photo-1437957146754-f6377debe171?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", nombre: "Lucas", descripcion: "Esto es una descripcion", color: "Negro", edad: 5 },
    { id: 2, urimagenurl: "https://images.unsplash.com/photo-1437957146754-f6377debe171?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", nombre: "Max", descripcion: "Esto es una descripcion de ejemplo", color: "Blanco con negro", edad: 6 },
    { id: 3, urimagenurl: "https://images.unsplash.com/photo-1437957146754-f6377debe171?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80", nombre: "Toby", descripcion: "Esto es una descripcion de ejemplo", color: "Gris", edad: 1 },
  ];
  
  const [infoMascotas, setInfoMascotas] = useState([]);

  async function buscarMascotas(){
    const docuRef = doc(firestore, `/animales/zZ9hWBcnRki61zogJFWd`);
    //const q = query(doc(firestore, `/animales/zZ9hWBcnRki61zogJFWd`), orderBy('edad', 'desc'))
    const consulta = await getDoc(docuRef);
    const infoData = consulta.data();
    return infoData.mascotas;
  }

  useEffect(() => {
    async function totalMascotas(){
      const getMascotas = await buscarMascotas();
      setInfoMascotas(getMascotas);
    }
    totalMascotas();
  }, []);  

  //tomamos la informacion del usuario que esta registrado
  
  var user = auth.currentUser; 

  //constante que tiene todo el arreglo de informacion 
 /*  const [solicitud, setSolicitudes] = useState({
    mascota: '',
    lastnameProfile: '',
    idcardProfile: '',
    phoneProfile: '',
    createdAt: new Date(),
  }); */

  //funcion para enviar la informacion a firebase
 
  /* const Create = () => {
  const myDoc = doc(firestore, "Usuarios", usuario)
  setDoc(myDoc, profile)
    .then(() => {
      alert("La informacion ha sido guardada correctamente")
    })
    .catch((error) => {
      alert(error.message)
    })} */
  
   

 async function sendForm(imagenMasota, nombreMascota){

  const solicitud = ({
    id: +new Date(),
    nombrePerro: nombreMascota,
    imagenUrl: imagenMasota,
    uidSolicitante: user.uid,
    nombreSolicitante: user.displayName,
    celularSolicitante: user.photoURL,
    emailSolicitante: user.email,
    validacionSolicitud: false,
    createdAt: new Date(),
});

  
  
  //const myDoc = doc(firestore, "Solicitudes");
  try {
    await addDoc(collection(firestore, 'Solicitudes'), solicitud)
    .then(() => {
      alert("La informacion ha sido guardada correctamente Ve al panel de solicitudes para revisar el estado");
    })
    .catch((error) => {
      alert(error);
    })
    
  } catch (error) {
    alert(error)
  }
  
  }



  return (
    <ScrollView style={styles.container}>
      {infoMascotas.map((Datos)=>{
        //const nombrecompleto = setNombreMascota(Datos.nombre);
        const urlimagen= Datos.urimagenurl;
        return(
        <View style={styles.card}>
        <Image style={styles.imagen}
        /* resizeMode='contain' */
        source={{
          uri: urlimagen
        }}/>
        
        <View style={styles.tituloscompletos}>
        <Text style={styles.titulocard}>Nombre: {Datos.nombre}</Text>
        <Text style={styles.titulocard}>Edad: {Datos.edad} Años</Text>
        <Text style={styles.titulocard}>Color: {Datos.color}</Text>
        </View>
        <View style={styles.descTotal}>
        <Text style={styles.descripcioncard}>{Datos.descripcion}</Text>
        </View>
        <View style={styles.botonInformacion}>
          <View style={styles.solicitar}>
          <TouchableOpacity style={styles.botonSolicitud} onPress={() => sendForm(urlimagen, Datos.nombre)}>
              <Text style={styles.textoBoton}>Adoptar <Ionicons name="heart" style={{fontSize: 20 ,color:'#D61C4E'}} /></Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
        )
      })}
    </ScrollView>
  );
};

export default ListaMascotas;

const styles = StyleSheet.create({
    container:{
        flex: 0,
        top: 40,
        marginBottom: 125,
        textAlign: 'center',
    },
    card:{
        backgroundColor: '#ECECEC',
        width: '90%',
        height: 500,
        left: 19,
        right: 19,
        borderRadius: 20,
        marginBottom: 10,
    },
    imagen:{
        width: '100%',
        height: 270,
        margin: 0,
        borderRadius: 20,  
    },
    titulocard:{
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    descripcioncard:{
        fontSize: 15,
        marginTop: 5,
    },
    tituloscompletos:{
      marginHorizontal: 15,
    },
    descTotal:{
      marginHorizontal: 5,
      alignItems: 'center',
    },
    botonInformacion:{
      alignItems: 'center',
      marginTop: 15,
    },
    botonSolicitud:{
      backgroundColor: '#F9F9F9',
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      borderColor: '#413F42',
      borderWidth: 0.3,
    },
    textoBoton:{
      fontSize: 20,
      color: '#413F42',
    },

});
