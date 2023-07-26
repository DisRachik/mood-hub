import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';

const image = require('./assets/photo-bg.png');
import { RegistrationScreen, LoginScreen } from './src/screens';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <RegistrationScreen />
        {/* <LoginScreen /> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    fontFamily: 'Roboto',
  },
});
