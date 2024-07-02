// Importamos las funciones que necesitemos
import { initializeApp } from "firebase/app";

//Añadimos las crendeciales de firebase que nos dio la propia plataforma

const firebaseConfig = {
  apiKey: "#",
  authDomain: "#",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "#"
};

// Inicializamos y exportamos la configuracion de Firebase
export const app = initializeApp(firebaseConfig);

//Exportamos firebaseApp para poder utilizarla desde cualquier lugar 

export default app
