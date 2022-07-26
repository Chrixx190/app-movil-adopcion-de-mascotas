import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileSign from '../screens/ProfileSign';
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <Stack.Navigator defaultScreenOptions={ProfileSign} screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileSign" component={ProfileSign}/> 
    </Stack.Navigator>
  )
}

export default MainNavigator