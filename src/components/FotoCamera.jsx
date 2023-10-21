import { useEffect, useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { Image, View, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CustomButton } from './buttons/CustomButton';

export const FotoCamera = () => {
  const [newFoto, setNewFoto] = useState('');

  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setPermission(status === 'granted');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const onPhoto = async () => {
    if (newFoto) {
      try {
        await MediaLibrary.deleteAssetsAsync(newFoto);
      } catch (error) {
        console.error(error);
      }

      setNewFoto('');
      return;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      setNewFoto(asset);
    }
  };

  return (
    <View>
      <View style={styles.imgWrap}>
        {newFoto ? (
          <Image source={newFoto} style={styles.img} />
        ) : (
          <Camera style={styles.camera} type={type} ref={setCameraRef} />
        )}
      </View>
      <CustomButton
        styleBtn={[styles.iconCircle, newFoto && { color: '#FFFFFF' }]}
        onPress={onPhoto}
      >
        <FontAwesome name="camera" size={24} color={newFoto ? '#FFFFFF' : '#BDBDBD'} />
      </CustomButton>

      {permission && !newFoto && (
        <CustomButton styleBtn={styles.iconTypeFoto} onPress={toggleCameraType}>
          <FontAwesome name="refresh" size={24} color="#BDBDBD" />
        </CustomButton>
      )}

      <CustomButton
        title={newFoto ? 'Редагувати фото' : 'Завантажте фото'}
        onPress={() => newFoto && setNewFoto('')}
        titleStyle={{ color: '#BDBDBD' }}
        disabled={newFoto ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -45 }],

    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTypeFoto: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
