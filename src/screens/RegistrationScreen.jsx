import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, CustomButton, RegistrationForm } from '../components';

export const RegistrationScreen = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const [keyboardOpen, setKeyboardOpen] = useState(true);

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
    <SafeAreaView style={[styles.container, !keyboardOpen && styles.keyboardActive]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
        style={styles.wrapKeyboard}
      >
        <View style={styles.imgWrap}>
          <CustomButton
            iconName="pluscircleo"
            onPress={() => {}}
            iconSize={25}
            styleBtn={styles.iconBtn}
            iconStyle={userPhoto ?? styles.iconActive}
          />
        </View>
        <Title text="Реєстрація" />
        <RegistrationForm keyboardOpen={keyboardOpen} />
        {keyboardOpen && <Text style={styles.informText}>Вже є акаунт? Увійти</Text>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.68,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  informText: {
    marginTop: 16,
    fontWeight: 400,
    color: '#1B4371',
  },
});
