import { useEffect, useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { Image, View, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CustomButton } from './buttons/CustomButton';

export const FotoCamera = ({ photoData, onClearForm, newImage }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState('fulfilled');

  const { width } = useWindowDimensions();
  const imgWrapHeight = width * 0.7;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setPermission(status === 'granted');
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('У доступі до місцезнаходження відмовлено');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!location) {
        return;
      }

      try {
        const address = await Location.reverseGeocodeAsync(location);
        const { region, country } = address[0];

        photoData((prevState) => ({
          ...prevState,
          place: `${region}, ${country}`,
          location,
        }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [location]);

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const onPhoto = async () => {
    if (newImage) {
      try {
        // await MediaLibrary.deleteAssetsAsync(newImage);
        setLocation('');
        onClearForm();
      } catch (error) {
        console.error(error);
      }
      return;
    }

    if (cameraRef) {
      setIsLoading('pending');
      try {
        const { uri } = await cameraRef.takePictureAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        photoData((prevState) => ({
          ...prevState,
          image: asset,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading('fulfilled');
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <View style={[styles.imgWrap, { height: imgWrapHeight }]}>
        {newImage ? (
          <Image source={newImage} style={styles.img} />
        ) : (
          <Camera style={styles.camera} type={type} ref={setCameraRef} />
        )}
      </View>
      <CustomButton
        styleBtn={[styles.iconCircle, newImage && { color: '#FFFFFF' }]}
        onPress={onPhoto}
        disabled={isLoading === 'pending' ? true : false}
      >
        {isLoading === 'fulfilled' && (
          <FontAwesome name="camera" size={24} color={newImage ? '#FFFFFF' : '#BDBDBD'} />
        )}
        {isLoading === 'pending' && <ActivityIndicator size="large" color="#FF6C00" />}
      </CustomButton>

      {permission && !newImage && (
        <CustomButton styleBtn={styles.iconTypeFoto} onPress={toggleCameraType}>
          <FontAwesome name="refresh" size={24} color="#BDBDBD" />
        </CustomButton>
      )}

      <CustomButton
        title={newImage ? 'Редагувати фото' : 'Завантажте фото'}
        onPress={() => newImage && onClearForm()}
        titleStyle={{ color: '#BDBDBD' }}
        disabled={newImage ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
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
