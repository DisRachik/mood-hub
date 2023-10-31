import { useEffect } from 'react';

import { useAuth } from '../redux/auth/useAuth';

import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';

import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

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
        <View style={styles.backdrop}>
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} color="#FF6C00" />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
