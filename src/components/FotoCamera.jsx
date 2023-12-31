import { useEffect, useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

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
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('У доступі до місцезнаходження відмовлено');
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      }
    }
  };

  const pickImageFromDevice = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [3, 4],
      });

      if (!result.canceled) {
        photoData((prevState) => ({
          ...prevState,
          image: result.assets[0],
        }));

        try {
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation(coords);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Ви не вибрали нове фото.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPickImg = () => {
    if (newImage) {
      onClearForm();
      return;
    }
    pickImageFromDevice();
  };

  return (
    <View>
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
      </View>
      <CustomButton
        title={newImage ? 'Інше фото' : 'Завантажте фото'}
        onPress={onPickImg}
        styleBtn={[styles.btn, newImage && styles.btnOther]}
        titleStyle={[styles.btnText, newImage && styles.btnOtherText]}
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
    transform: [{ translateX: -30 }, { translateY: -30 }],

    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTypeFoto: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  btn: {
    width: '100%',
    height: 51,
    marginVertical: 8,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  btnText: {
    color: '#FFFFFF',
  },
  btnOther: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  btnOtherText: { color: '#BDBDBD' },
});
