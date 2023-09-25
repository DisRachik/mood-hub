import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, LoginForm, AuthScreenButton } from '../components';
const image = require('../../assets/photo-bg.png');

export const LoginScreen = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[styles.container, !keyboardOpen && styles.keyboardActive]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={0}
              style={styles.wrapKeyboard}
            >
              <Title text="Увійти" />
              <LoginForm keyboardOpen={keyboardOpen} />
              {keyboardOpen && (
                <AuthScreenButton
                  text="Немає акаунту? "
                  nameNavigationScreen="Зареєструватися"
                  onPress={() => navigation.navigate('Registration')}
                />
              )}
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    fontFamily: 'Roboto',
  },
  container: {
    flex: 0.6,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  keyboardActive: {
    flex: 0,
    height: 248,
  },
  wrapKeyboard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});
