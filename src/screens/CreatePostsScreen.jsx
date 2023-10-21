import { useState } from 'react';

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
import { Feather, FontAwesome } from '@expo/vector-icons';
import { CustomButton } from '../components/buttons/CustomButton';
import { FotoCamera } from '../components/FotoCamera';

const initialFormState = {
  image: '',
  title: '',
  location: '',
};

export const CreatePostsScreen = () => {
  const [newImage, setNewImage] = useState(true);
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
            <FotoCamera />

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

            {formState.image ? (
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
              styleBtn={[styles.deleteIcon, !formState.image && { borderColor: '#FFFFFF' }]}
              onPress={() => setFormState(initialFormState)}
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
