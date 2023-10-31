import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../redux/auth/useAuth';

import { uploadPhotoToServer } from '../firebase/uploadPhotoToServer';
import { uploadPostToServer } from '../firebase/dataPostWithServer';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomButton } from '../components/buttons/CustomButton';
import { FotoCamera } from '../components/FotoCamera';

const initialFormState = {
  image: '',
  title: '',
  location: '',
  place: '',
};

export const CreatePostsScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [formState, setFormState] = useState(initialFormState);
  const [activeInput, setActiveInput] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [formState.place]);

  const onSubmit = async () => {
    const { image, title, location, place } = formState;

    const partsAddress = place.split(',');
    if (partsAddress.length !== 2) {
      setError('Укажіть лише регіон і країну через кому!');
      return;
    }

    const newPhotoURL = await uploadPhotoToServer('postPhoto/', image);

    const region = partsAddress[0].trim();
    const country = partsAddress[1].trim();
    const formData = {
      userId: user.userId,
      img: newPhotoURL,
      title,
      location,
      region,
      country,
    };

    await uploadPostToServer(formData);
    navigation.navigate('PostsScreen');
    setFormState(initialFormState);
  };

  const onClearForm = () => setFormState(initialFormState);
  const isFormValid = formState.image && formState.title && formState.place;
  const isFormClear = formState.image || formState.title || formState.place;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapKeyboard}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.container, activeInput && { paddingBottom: 100 }]}>
            <FotoCamera
              photoData={setFormState}
              onClearForm={onClearForm}
              newImage={formState.image}
            />

            <TextInput
              name="title"
              style={[styles.input, activeInput === 'title' && styles.inputActive]}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                setActiveInput('title');
              }}
              onBlur={() => {
                setActiveInput(null);
              }}
              value={formState.title}
              onChangeText={(value) =>
                setFormState((prevState) => ({ ...prevState, title: value }))
              }
            />
            <View style={styles.inputWrap}>
              <Feather name="map-pin" size={24} style={styles.mapPinIcon} />
              <TextInput
                name="place"
                style={[
                  styles.input,
                  styles.inputPlace,
                  activeInput === 'place' && styles.inputActive,
                ]}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setActiveInput('place');
                }}
                onBlur={() => {
                  setActiveInput(null);
                }}
                value={formState.place}
                onChangeText={(value) =>
                  setFormState((prevState) => ({ ...prevState, place: value }))
                }
              />
              {error && <Text style={{ color: 'red' }}>{error}</Text>}
            </View>

            {isFormValid ? (
              <CustomButton
                title="Опубліковати"
                onPress={onSubmit}
                styleBtn={styles.formBtn}
                titleStyle={styles.formBtnText}
              />
            ) : (
              <Text style={styles.text}>Опубліковати</Text>
            )}

            <CustomButton
              styleBtn={[styles.deleteIcon, !isFormClear && { borderColor: '#FFFFFF' }]}
              onPress={onClearForm}
            >
              <Feather name="trash-2" size={24} color={formState.image ? '#212121' : '#BDBDBD'} />
            </CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 16,
  },

  input: {
    width: '100%',
    height: 50,
    marginTop: 32,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#f6f6f6',
    borderStyle: 'solid',
    borderRadius: 8,

    fontSize: 16,
    fontWeight: '400',
    color: '#212121',
  },
  inputWrap: {
    marginTop: 16,
  },
  inputPlace: {
    paddingLeft: 28,
    marginTop: 0,
  },
  inputActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },

  mapPinIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 13,
    color: '#BDBDBD',
  },

  formBtn: {
    width: '100%',
    height: 51,
    marginVertical: 32,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  formBtnText: {
    color: '#FFFFFF',
  },
  text: {
    textAlign: 'center',
    marginVertical: 48,
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  deleteIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 'auto',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6C00',
  },
});
