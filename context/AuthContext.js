import { createContext, useContext, useEffect, useState } from "react"
//tener cuidado con el archivo de credenciales xd ya que al importarlo lo toma como un componente y lo toma con la c en Mayuscula
//import app from "../firebase/credenciales"
//import {getAuth,onAuthStateChanged,signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from 'firebase/auth'

const auth = getAuth(app)

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No hay un proveedor utilizado");
  return context;
};

export function AuthProvider({ children }) {

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  const signupWithGoogle = () =>{

  }
  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //aqui abajo se guardaria el uid
  //const [uid, setUid] = useState()

  useEffect(() => {
    //console.log("El auth provider esta funcionando")
    const unsuscribe = onAuthStateChanged(auth, currentUser =>{
      //console.log(currentUser)
      setUser(currentUser)
      //aqui tendriamos que crear un use auth que contega el uid con currentUser.uid, el codigo seria el de aqui abajo
      //setUid(curretUser.uid)
      setLoading(false)
    })

    return () => unsuscribe()

  }, [])

  return (
    //exportamos la variable uid que esta dentro del useState para poder utilizarlo dentro del componente de ProtectedRoute.jsx 
    <AuthContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}