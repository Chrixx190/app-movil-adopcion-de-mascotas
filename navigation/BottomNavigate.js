import {StyleSheet, Text} from 'react-native';
import { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Solicitudes from '../screens/Solicitudes';
import ProfileSign from '../screens/ProfileSign';
import app from '../firebase/credenciales'
import { onAuthStateChanged,getAuth} from 'firebase/auth'
import {doc, getFirestore, getDoc} from 'firebase/firestore'

const auth = getAuth(app)
const firestore = getFirestore(app)

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const AllNavigator = () =>{
  return(
    <Tab.Navigator screenOptions={{headerShown: false, 
      tabBarStyle: { 
        position: 'absolute', 
        height: 57, 
        left: 20, 
        right: 20, 
        bottom:15, 
        borderRadius: 50,
        elevation: 0
      }}}
      tabBarOptions={{
        showLabel: false,
      }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon:({focused}) =>(
            <Ionicons name="home" style={{
              fontSize: 25,
              color: focused ? '#F2D1D1' : '#7F8487'
            }} />
          )
        }}/>
        <Tab.Screen name="solicitudes" component={Solicitudes} options={{
          tabBarIcon:({focused}) =>(
            <Ionicons name="paw" style={{
              fontSize: 25,
              color: focused ? '#F2D1D1' : '#7F8487'
            }} />
          )
        }} />
        <Tab.Screen name="perfil" component={Perfil} options={{
          tabBarIcon:({focused}) =>(
            <Ionicons name="person-circle-outline" style={{
              fontSize: 25,
              color: focused ? '#F2D1D1' : '#7F8487'
            }} />
          )
        }}/>
      </Tab.Navigator>
  );
}

const BottomNavigate = () => {
  var user = auth.currentUser;
  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          {user.displayName ? 
          <Stack.Screen name="AllNavigator" component={AllNavigator}options={{ headerShown: false }}/> 
             : 
          <>
          <Stack.Screen name="ProfileSign" component={ProfileSign} options={{ headerShown: false }}/>
          <Stack.Screen name="AllNavigator" component={AllNavigator}options={{ headerShown: false }}/> 
          </>
          } 
        </Stack.Navigator>
      </NavigationContainer> 
  )   
}



export default BottomNavigate