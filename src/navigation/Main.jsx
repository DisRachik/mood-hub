import { useEffect } from 'react';

import { useAuth } from '../redux/auth/useAuth';

import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';

import { ActivityIndicator, Modal, StyleSheet, ImageBackground } from 'react-native';
const image = require('../../assets/photo-bg.png');

export const Main = () => {
  const { user, isLoading, checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {!user.email ? <AuthNavigation /> : <MainNavigation />}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}
        statusBarTranslucent={true}
        onRequestClose={() => {}}
      >
        <ImageBackground source={image} resizeMode="cover" style={styles.backdrop}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} color="#FF6C00" />
        </ImageBackground>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
});
