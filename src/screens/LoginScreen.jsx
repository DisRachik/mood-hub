import { KeyboardAvoidingView, Platform, StyleSheet, Text, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, LoginForm } from '../components';
import { useEffect, useState } from 'react';

export const LoginScreen = () => {
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
        <Title text="Увійти" />
        <LoginForm keyboardOpen={keyboardOpen} />
        {keyboardOpen && <Text style={styles.informText}>Немає акаунту? Зареєструватися</Text>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  informText: {
    marginTop: 16,
    fontWeight: 400,
    color: '#1B4371',
  },
});
