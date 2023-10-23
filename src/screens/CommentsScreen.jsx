import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';

import { CustomButton } from '../components/buttons/CustomButton';
import { useCollection } from '../navigation/CollectionContext';
import noNameFoto from '../../assets/images.jpg';

export const CommentsScreen = () => {
  const { params } = useRoute();
  const { img, comment, id } = params;

  const { addComment } = useCollection();
  const [inputState, setInputState] = useState('');
  const [activeInput, setActiveInput] = useState(false);
  const [isSubmit, setIsSubmit] = useState(null);

  const { width } = useWindowDimensions();
  const imgHeight = width * 0.7;

  useEffect(() => {
    setIsSubmit(Boolean(inputState.trim()));
  }, [inputState]);

  const onSubmit = async () => {
    try {
      addComment({
        newComment: inputState,
        idPost: id,
        idUser: 'I`m',
      });

      setInputState('');
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={[styles.img, { height: imgHeight }]} resizeMode="contain" />

      <FlatList
        data={comment}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { user, date, text } = item;
          const isMyPost = user === 'I`m';
          return (
            <View style={styles.commentWrap}>
              <View style={[styles.comment, isMyPost && { flexDirection: 'row-reverse' }]}>
                {!isMyPost ? (
                  <FontAwesome name="user-secret" size={28} color="#212121" />
                ) : (
                  <Image source={noNameFoto} style={styles.imgNoname} />
                )}
                <Text style={styles.text}>{text}</Text>
              </View>
              <Text style={[styles.data, !isMyPost && { textAlign: 'right' }]}>{date}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 40 }}
        style={styles.listWrap}
      />

      <View style={styles.commentForm}>
        <TextInput
          name="comment"
          style={[styles.input, activeInput && styles.inputActive]}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          onFocus={() => {
            setActiveInput(true);
          }}
          onBlur={() => {
            setActiveInput(false);
          }}
          value={inputState}
          onChangeText={(value) => setInputState(value)}
        />

        <CustomButton
          styleBtn={[styles.iconCircle, !isSubmit && { backgroundColor: '#FFFFFF' }]}
          disabled={inputState ? false : true}
          onPress={onSubmit}
        >
          <FontAwesome name="long-arrow-up" size={34} color={isSubmit ? '#FFFFFF' : '#BDBDBD'} />
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  img: {
    width: '100%',
    borderRadius: 8,
  },

  listWrap: {
    marginVertical: 32,
  },
  commentWrap: {
    gap: 8,
  },
  comment: {
    flexDirection: 'row',
    gap: 16,
  },
  imgNoname: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },

  text: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
  },
  data: {
    marginHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: '#BDBDBD',
  },

  commentForm: {
    paddingRight: 8,
    flexDirection: 'row',
    gap: 5,
  },

  input: {
    flex: 1,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#f6f6f6',
    borderStyle: 'solid',
    borderRadius: 8,

    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#212121',
  },
  inputActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6C00',
  },

  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
  },
});
