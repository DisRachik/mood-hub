import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CustomButton } from './buttons/CustomButton';

export const UserFoto = ({ toTop }) => {
  const [userPhoto, setUserPhoto] = useState(null);

  return (
    <View style={[styles.imgWrap, toTop && styles.imgWrapToTop]}>
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

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  imgWrapToTop: {
    position: 'absolute',
    top: -60,
  },
  iconBtn: {
    right: '-100%',
    top: '100%',
    transform: [{ translateY: -37.5 }, { translateX: -12.5 }],
  },
  iconActive: {
    color: '#BDBDBD',
    transform: [{ rotate: '45deg' }],
  },
  icon: {
    color: '#FF6C00',
  },
});
