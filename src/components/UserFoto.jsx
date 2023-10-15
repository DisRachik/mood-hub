import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CustomButton } from './buttons/CustomButton';
import noNameFoto from '../../assets/images.jpg';

export const UserFoto = ({ toTop }) => {
  const [userPhoto, setUserPhoto] = useState(null);

  return (
    <View style={[styles.imgWrap, toTop && styles.imgWrapToTop]}>
      <Image source={noNameFoto} style={styles.img} />
      <CustomButton
        onPress={() => {
          Keyboard.dismiss();
        }}
        styleBtn={styles.iconBtn}
      >
        <AntDesign
          name="pluscircleo"
          size={25}
          style={userPhoto ? styles.iconActive : styles.icon}
        />
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
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
