import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="Forgot" component={ForgotPassword}/>
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigator