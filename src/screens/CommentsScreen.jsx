import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../redux/auth/useAuth';
import {
  deletePost,
  getCommentsForPost,
  getOnePost,
  sendCommentToServer,
} from '../firebase/dataPostWithServer';

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
  ActivityIndicator,
  Alert,
} from 'react-native';

import { CustomButton } from '../components/buttons/CustomButton';
import noNameFoto from '../../assets/images.jpg';
import { deletePhotoFromServer } from '../firebase/uploadPhotoToServer';

const actionConfirmation = async (postId, image, navigation) => {
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
          await deletePhotoFromServer('postPhoto/', image);
          await deletePost(postId);
          navigation.goBack();
        },
      },
    ],
    {
      cancelable: false,
    }
  );
};

export const CommentsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user } = useAuth();
  const { userId, avatar, name } = user;
  const ownUserFoto = { uri: avatar };

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [inputState, setInputState] = useState('');
  const [activeInput, setActiveInput] = useState(false);
  const [isSubmit, setIsSubmit] = useState(null);

  const { width } = useWindowDimensions();
  const imgHeight = width * 0.7;

  useEffect(() => {
    (async () => await getOnePost(setPost, params.postId))();
  }, []);

  useEffect(() => {
    (async () => await getCommentsForPost(setComments, params.postId))();
  }, []);

  useEffect(() => {
    setIsSubmit(Boolean(inputState.trim()));
  }, [inputState]);

  const onDeletePost = async () => {
    actionConfirmation(params.postId, post.img, navigation);
  };

  const onSubmit = async () => {
    sendCommentToServer({
      newComment: inputState,
      postId: params.postId,
      userId,
      avatar,
      name,
      commentsCounter: post.commentsCounter,
    });

    setInputState('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imgWrap, { height: imgHeight }]}>
        {post ? (
          <Image source={{ uri: post.img }} style={[styles.img]} resizeMode="cover" />
        ) : (
          <ActivityIndicator size="large" color="#FF6C00" />
        )}

        {post && userId === post.userId && (
          <CustomButton styleBtn={styles.deleteIcon} onPress={onDeletePost}>
            <FontAwesome name="trash-o" size={24} color="#FF6C00" />
          </CustomButton>
        )}
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.commentId}
        renderItem={({ item }) => {
          const { own, ownAvatar, postDate, text, ownName } = item;
          const isMyPost = userId === own;

          return (
            <View style={styles.commentWrap}>
              <View style={[styles.comment, isMyPost && { flexDirection: 'row-reverse' }]}>
                {!isMyPost ? (
                  <>
                    {ownAvatar ? (
                      <Image source={{ uri: ownAvatar }} style={styles.imgNoname} />
                    ) : (
                      <FontAwesome name="user-secret" size={28} color="#212121" />
                    )}
                  </>
                ) : (
                  <Image
                    source={avatar && avatar !== '' ? ownUserFoto : noNameFoto}
                    style={styles.imgNoname}
                  />
                )}

                <View style={{ paddingHorizontal: 16, width: '90%' }}>
                  {!isMyPost && <Text style={[styles.data, { color: '#FF6C00' }]}>{ownName}</Text>}
                  <Text style={[styles.text, isMyPost && { textAlign: 'right' }]}>{text}</Text>
                </View>
              </View>
              <Text style={[styles.data, isMyPost && { textAlign: 'left' }]}>{postDate}</Text>
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
  imgWrap: { width: '100%' },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  deleteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 60,
    height: 60,
    // alignSelf: 'center',
    // marginTop: 'auto',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6C00',
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
    // marginTop: 16,
    // marginHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
  },
  data: {
    marginHorizontal: 16,
    textAlign: 'right',
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
