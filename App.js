import { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { AuthNavigation, HomeNavigation } from './src/navigation';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onAuth = () => setIsSignedIn((isSignedIn) => !isSignedIn);

  return (
    <NavigationContainer>
      {!isSignedIn ? <AuthNavigation /> : <HomeNavigation />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
