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
import { Title, CustomButton, RegistrationForm, AuthScreenButton } from '../components';
const image = require('../../assets/photo-bg.png');

export const RegistrationScreen = ({ route }) => {
  const [userPhoto, setUserPhoto] = useState(null);
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
          <View style={[styles.container, !keyboardOpen && styles.keyboardActive]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={0}
              style={styles.wrapKeyboard}
            >
              <View style={styles.imgWrap}>
                <CustomButton
                  iconName="pluscircleo"
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                  iconSize={25}
                  styleBtn={styles.iconBtn}
                  iconStyle={userPhoto ?? styles.iconActive}
                />
              </View>
              <Title text="Реєстрація" />

              <RegistrationForm keyboardOpen={keyboardOpen} onClick={route.params.onAuth} />
              {keyboardOpen && (
                <AuthScreenButton
                  text="Вже є акаунт? "
                  nameNavigationScreen="Увійти"
                  onPress={() => navigation.navigate('Login')}
                />
              )}
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 0.68,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: -25,
  },
  keyboardActive: {
    flex: 0,
    height: 374,
  },
  wrapKeyboard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
  },
  imgWrap: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: -60,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  iconBtn: {
    right: '-100%',
    top: '100%',
    transform: [{ translateY: -37.5 }, { translateX: -12.5 }],
  },
  iconActive: {
    color: '#FF6C00',
  },
});
