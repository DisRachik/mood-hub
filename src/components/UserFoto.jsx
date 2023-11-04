import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../redux/auth/useAuth';

import { AntDesign } from '@expo/vector-icons';
import { CustomButton } from './buttons/CustomButton';
import noNameFoto from '../../assets/images.jpg';
import { deletePhotoFromServer } from '../firebase/uploadPhotoToServer';

const actionConfirmation = async (deletePhoto, image, setUserPhoto) => {
  Alert.alert(
    'Видалити фото?',
    'Ви впевнені, що хочете видалити це фото з профілю?',
    [
      {
        text: 'Відміна',
        style: 'cancel',
      },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          // await deletePhotoFromServer('avatars/', image);
          await deletePhoto({ avatarURL: '' });
          setUserPhoto(null);
        },
      },
    ],
    {
      cancelable: false,
    }
  );
};

export const UserFoto = ({ toTop, userPhoto, setUserPhoto }) => {
  const { user, updateAvatar, isUpdateComponent } = useAuth();
  const onPickImage = async () => {
    if (userPhoto) {
      if (user.avatar) {
        await actionConfirmation(updateAvatar, user.avatar, setUserPhoto);
      } else {
        setUserPhoto(null);
      }
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setUserPhoto(result.assets[0]);
      } else {
        alert('Ви не вибрали нове фото.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.imgWrap, toTop && styles.imgWrapToTop]}>
      {isUpdateComponent ? (
        <ActivityIndicator size="large" color="#FF6C00" />
      ) : (
        <>
          <Image source={userPhoto ? userPhoto : noNameFoto} style={styles.img} />
          <CustomButton onPress={onPickImage} styleBtn={styles.iconBtn}>
            <AntDesign
              name="pluscircleo"
              size={25}
              style={userPhoto ? styles.iconActive : styles.icon}
            />
          </CustomButton>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    position: 'absolute',
    top: -60,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
  },
  imgWrapToTop: {
    position: 'absolute',
    top: -60,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  iconBtn: {
    position: 'absolute',
    bottom: 9,
    right: 0,
    transform: [{ translateX: 12.5 }],
  },
  iconActive: {
    color: '#BDBDBD',
    transform: [{ rotate: '45deg' }],
  },
  icon: {
    color: '#FF6C00',
  },
});
