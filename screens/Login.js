import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View , Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Svg, {Ellipse, Path, Defs, LinearGradient, Stop,} from "react-native-svg";
import { LinearGradient as Gradient } from 'expo-linear-gradient'
import { useState } from 'react';
import app from '../firebase/credenciales';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
const auth = getAuth(app)

export default function Login({ navigation }) {

  function SvgTop(){
    return(
      <Svg
    width={375}
    height={179}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Ellipse cx={277.5} cy={135.272} rx={128.5} ry={43.728} fill="url(#a)" />
    <Path
      d="M0 162.993c45.357 5.195 99.854 29.564 205.917 0 44.322-12.354 115.272-29.65 181.083 0V0H0v162.993Z"
      fill="url(#b)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={192}
        y1={154.479}
        x2={383.977}
        y2={158.149}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EECDA3" />
        <Stop offset={1} stopColor="#EF629F" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0}
        y1={75.605}
        x2={387}
        y2={75.605}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#EECDA3" />
        <Stop offset={1} stopColor="#EF629F" />
      </LinearGradient>
    </Defs>
  </Svg>
    );
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const enviarInfo = () =>{
    signInWithEmailAndPassword(auth, email, password)
     .then(()=>{
      alert("Ha iniciado sesion correctamente");
     }
     ).catch((err) => {
      if(err.code == "auth/invalid-email"){
        alert("El email no es valido")
      }
      if(err.code == "auth/user-not-found"){
        alert("El usuario no esta registrado")
      }
      if(err.code == "auth/invalid-password"){
        alert("La contraseña no es valida")
      }
     })
  }

  return (
    <View style={styles.maincontainer}>
      <StatusBar style="auto"/>
      <View style={styles.containerSVG}>
      <SvgTop />
      </View>
      <View style={styles.container}>
      <Text style={styles.titulo}>Inicia sesion</Text>
      <Text style={styles.parrafo}>Ingresa a tu cuenta</Text>
      <TextInput 
      placeholder='Ingresa tu correo'
      style={styles.input}
      keyboardType='email-address'
      autoFocus= {true}
      value={email}
      onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
      placeholder='Ingresa tu contraseña'
      style={styles.input}
      textContentType='password'
      secureTextEntry={true}
      value={password}
      onChangeText={(text) => setPassword(text)}
      />

     <TouchableOpacity style={styles.botonprincipal} onPress={enviarInfo}>
        <Gradient
        colors={['#EECDA3', '#EF629F']}
        start={{ x: 0, y: 0 }}
        end={{x: 1, y: 1}}
        style={styles.boton}
        >
        <Text style={styles.nombreBoton}>Inicia sesion</Text>
        </Gradient>
     </TouchableOpacity>

     <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
       <Text style={styles.registro}> Olvide mi contraseña</Text>
      </TouchableOpacity>

     
      
      <View style={styles.navegacion}>
      <Text style={styles.cuenta}>¿No tienes una cuenta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
       <Text style={styles.registro}> Registrate</Text>
      </TouchableOpacity>
      </View>

      

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer:{
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {
    paddingTop:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSVG:{
   justifyContent: 'flex-start',
   alignItems: 'center',
  },
  titulo:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#34434D'
  },
  parrafo:{
    fontSize: 20,
  },
  input:{
    backgroundColor: 'white',
    paddingStart:25,
    padding: 10,
    width: '80%',
    height: 50,
    marginTop: 15,
    borderRadius: 30,
  },
  olvide:{
    paddingTop: 15,
    color: '#EF629F',
  },
  cuenta:{
    color: '#34434D',
    paddingTop: 15,
    fontSize: 18,
  },
  registro:{
    paddingTop: 15,
    color: '#EF629F',
    fontSize: 17,
  },
  navegacion:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonprincipal:{
    width: 250,
    alignItems: 'center',
    marginTop: 15,
  },
  boton:{
  width: '80%',
  height: 50,
  borderRadius: 25,
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',

  },
  nombreBoton:{
      color: 'white',
      fontSize: 15,
      fontWeight: '700',
  },
});