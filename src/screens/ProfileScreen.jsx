import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { Card } from '../components/Card';
import { LogOutButton } from '../components/buttons/LogOutButton';
import { Title } from '../components/Title';
import { UserFoto } from '../components/UserFoto';
import { useAuth } from '../navigation/AuthProvider';
import { useCollection } from '../navigation/CollectionContext';

const image = require('../../assets/photo-bg.png');

export const ProfileScreen = () => {
  const { onAccess } = useAuth();
  const { collection } = useCollection();

  const onLogOut = () => {
    onAccess();
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.userWrap}>
              <UserFoto />
              <LogOutButton onPress={onLogOut} style={styles.btn} />
              <Title text="Natali Romanova" />
            </View>
          )}
          style={styles.ItemsWrap}
          data={collection}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card data={item} likeCount />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  userWrap: {
    marginTop: 119,
    paddingBottom: 33,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 46,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    top: -22,
    right: 0,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  ItemsWrap: { width: '100%' },
  cardsWrap: {
    paddingTop: 32,
    marginBottom: 1,
  },
});
