import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import {
  RegistrationScreen,
  LoginScreen,
  PostsScreen,
  CommentsScreen,
  ProfileScreen,
  MapScreen,
} from './src/screens';
import { useState } from 'react';

const AuthStack = createStackNavigator();
const HomeStack = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onAuth = () => setIsSignedIn((prevState) => !prevState);

  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
            initialParams={{ onAuth }}
          />
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
            initialParams={{ onAuth }}
          />
        </AuthStack.Navigator>
      ) : (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="PostsScreen"
            component={PostsScreen}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
        </HomeStack.Navigator>
      )}

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
