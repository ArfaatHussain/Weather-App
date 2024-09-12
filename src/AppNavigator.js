import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import SplashScreen from './SplashScreen';
const Stack = createNativeStackNavigator();
const Navigator = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown:false
            }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 

export default Navigator;