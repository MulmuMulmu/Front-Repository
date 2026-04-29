import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AllergyScreen from './src/screens/AllergyScreen';
import PreferScreen from './src/screens/PreferScreen';
import DislikeScreen from './src/screens/DislikeScreen';
import MainNavigator from './src/navigation/MainNavigator';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Allergy" component={AllergyScreen} />
        <Stack.Screen name="Prefer" component={PreferScreen} />
        <Stack.Screen name="Dislike" component={DislikeScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}