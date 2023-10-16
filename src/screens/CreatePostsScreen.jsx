import { useState } from 'react';

import {
  Image,
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
import { Feather, FontAwesome } from '@expo/vector-icons';
import { CustomButton } from '../components/buttons/CustomButton';

const initialFormState = {
  image: '',
  title: '',
  location: '',
};

export const CreatePostsScreen = () => {
  const [newImage, setNewImage] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [formState, setFormState] = useState(initialFormState);

  const onSubmit = () => {
    console.log(formState);
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapKeyboard}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.container, activeInput && { paddingBottom: 100 }]}>
            <View>
              <View style={styles.imgWrap}>
                {newImage && (
                  <Image source={require('../data/img/decline.jpg')} style={styles.img}></Image>
                )}
              </View>
              <CustomButton
                title={newImage ? 'Редагувати фото' : 'Завантажте фото'}
                onPress={() => {}}
                titleStyle={{ color: '#BDBDBD' }}
              />
              <CustomButton styleBtn={[styles.iconCircle, newImage && { color: '#FFFFFF' }]}>
                <FontAwesome name="camera" size={24} color={newImage ? '#BDBDBD' : '#FFFFFF'} />
              </CustomButton>
            </View>
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
                name="location"
                style={[
                  styles.input,
                  styles.inputLocation,
                  activeInput === 'location' && styles.inputActive,
                ]}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setActiveInput('location');
                }}
                onBlur={() => {
                  setActiveInput(null);
                }}
                value={formState.location}
                onChangeText={(value) =>
                  setFormState((prevState) => ({ ...prevState, location: value }))
                }
              />
            </View>

            {newImage ? (
              <CustomButton
                title="Опубліковати"
                onPress={onSubmit}
                styleBtn={styles.formBtn}
                titleStyle={styles.formBtnText}
                disabled={newImage}
              />
            ) : (
              <Text style={styles.text}>Опубліковати</Text>
            )}

            <CustomButton styleBtn={[styles.deleteIcon, !newImage && { borderColor: '#FFFFFF' }]}>
              <Feather name="trash-2" size={24} color={newImage ? '#212121' : '#BDBDBD'} />
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
    backgroundColor: '#f6f6f6',
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 16,
  },
  imgWrap: {
    height: 240,
    paddingBottom: 8,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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

  input: {
    width: '100%',
    height: 50,
    marginTop: 32,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderRadius: 8,

    fontSize: 16,
    fontWeight: '400',
    color: '#212121',
  },
  inputWrap: {
    marginTop: 16,
  },
  inputLocation: {
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
