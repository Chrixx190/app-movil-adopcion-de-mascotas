import React, {useState, createContext, useContext, useEffect} from 'react'
import { View, ActivityIndicator } from 'react-native'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import app from './firebase/credenciales'
import BottomNavigate from './navigation/BottomNavigate';
import AuthNavigator from './navigation/AuthNavigator';
const AuthContext = createContext({})
const auth = getAuth(app)


const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  return(
   <AuthContext.Provider value={{user, setUser}}>
     {children}
   </AuthContext.Provider>
  )
}


function Inicio(){ 
  return(
    <BottomNavigate />
  );
}

function AuthStack(){
  return(
    <>
      <AuthNavigator />
    </>
  )
}
function RootNavigator(){
  const {user, setUser} = useContext(AuthContext);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, 
      async currentUser =>{
        currentUser ? setUser(currentUser) : setUser(null);
        setLoading(false);
      }
    )

    return () => unsuscribe();

  }, [user])

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return(
  <>
   {user ? <Inicio /> : <AuthStack />}
  </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider> 
  );
}
