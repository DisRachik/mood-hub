import { useEffect, useState } from 'react';

import { useAuth } from '../redux/auth/useAuth';

import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';

import { Card } from '../components/Card';
import { LogOutButton } from '../components/buttons/LogOutButton';
import { Title } from '../components/Title';
import { UserFoto } from '../components/UserFoto';
const image = require('../../assets/photo-bg.png');

import { useCollection } from '../navigation/CollectionContext';
import { uploadPhotoToServer } from '../firebase/uploadPhotoToServer';

export const ProfileScreen = () => {
  const { user, signOut, updateAvatar } = useAuth();
  const [userPhoto, setUserPhoto] = useState(null);
  const { collection } = useCollection();

  useEffect(() => {
    user.avatar && setUserPhoto({ uri: user.avatar });
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user.avatar && userPhoto) {
        const avatarURL = await uploadPhotoToServer('avatars/', userPhoto);
        updateAvatar({ avatarURL: avatarURL });
      }
    })();
  }, [userPhoto]);

  const onLogOut = () => {
    signOut();
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.imageBg}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.userWrap}>
              <UserFoto userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
              <LogOutButton onPress={onLogOut} style={styles.btn} />
              <Title text={user.name} />
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
});
