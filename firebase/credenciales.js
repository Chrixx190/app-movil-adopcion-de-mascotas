// Importamos las funciones que necesitemos
import { initializeApp } from "firebase/app";

//Añadimos las crendeciales de firebase que nos dio la propia plataforma

const firebaseConfig = {
  apiKey: "AIzaSyDqbofH-h-2Nrq4hMja1THVxhH_lvITLYc",
  authDomain: "plataforma-adopcion-b85d7.firebaseapp.com",
  projectId: "plataforma-adopcion-b85d7",
  storageBucket: "plataforma-adopcion-b85d7.appspot.com",
  messagingSenderId: "455950456206",
  appId: "1:455950456206:web:5f361fd5a5fd21802280df"
};

// Inicializamos y exportamos la configuracion de Firebase
export const app = initializeApp(firebaseConfig);

//Exportamos firebaseApp para poder utilizarla desde cualquier lugar 

export default app