import { useEffect, useState } from 'react';

import { useAuth } from '../redux/auth/useAuth';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { uploadPhotoToServer } from '../firebase/uploadPhotoToServer';
import { getOwnPost } from '../firebase/dataPostWithServer';

import { Card } from '../components/Card';
import { LogOutButton } from '../components/buttons/LogOutButton';
import { Title } from '../components/Title';
import { UserFoto } from '../components/UserFoto';
const image = require('../../assets/photo-bg.png');

export const ProfileScreen = () => {
  const { user, signOut, updateAvatar } = useAuth();
  const [userPhoto, setUserPhoto] = useState(null);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getOwnPost(setCollection, user.userId);
  }, []);

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
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', '#fff']}
          locations={[0.3, 0.3]}
          style={styles.gradient}
        >
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
            keyExtractor={(item) => item.postId}
            renderItem={({ item }) => <Card data={item} likeCount />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'tomato',
                }}
              >
                <Text style={{ color: 'red' }}>test</Text>
              </View>
            }
          />
        </LinearGradient>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
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
  ItemsWrap: {
    width: '100%',
  },
});
