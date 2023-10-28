import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { useAuth } from '../redux/auth/useAuth';

import { AuthNavigation } from './AuthNavigation';
import { CollectionProvider } from './CollectionContext';
import { MainNavigation } from './MainNavigation';

export const Main = () => {
  const { user, isLoading } = useAuth();

  const isSignedIn = user.email;

  console.log('MAINuserSTATE', user);

  return (
    <>
      {!isSignedIn ? (
        <AuthNavigation />
      ) : (
        <CollectionProvider>
          <MainNavigation />
        </CollectionProvider>
      )}
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
