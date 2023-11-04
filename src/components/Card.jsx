import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../redux/auth/useAuth';
import { toggleLikeForPost } from '../firebase/dataPostWithServer';

import { Feather } from '@expo/vector-icons';
import { StyleSheet, Image, Text, View, useWindowDimensions } from 'react-native';
import { CustomButton } from './buttons/CustomButton';

export const Card = ({ data }) => {
  const { img, title, commentsCounter, region, country, location, postId, currentLikes } = data;
  console.log('data', currentLikes);

  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(currentLikes.includes(user.userId));
  console.log('isLiked', isLiked);

  useEffect(() => {
    setIsLiked(currentLikes.includes(user.userId));
  }, [data]);

  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const imgHeight = width * 0.7;

  onPressLikes = () => {
    const operation = isLiked ? 'decrease' : 'increase';
    toggleLikeForPost(postId, user.userId, operation);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        styleBtn={styles.imgWrap}
        onPress={() => navigation.navigate('CommentsScreen', { postId })}
      >
        <Image
          source={{ uri: img }}
          style={[styles.img, { height: imgHeight }]}
          resizeMode="cover"
        />
      </CustomButton>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.info}>
        <CustomButton
          styleBtn={styles.wrap}
          onPress={() => navigation.navigate('CommentsScreen', data)}
        >
          <Feather
            name="message-circle"
            size={24}
            color={commentsCounter ? '#FF6C00' : '#BDBDBD'}
          />
          <Text style={styles.infoText}>{commentsCounter}</Text>
        </CustomButton>

        <CustomButton styleBtn={styles.wrap} onPress={onPressLikes}>
          <Feather name="thumbs-up" size={24} color={isLiked ? '#FF6C00' : '#BDBDBD'} />
          <Text style={styles.infoText}>{currentLikes.length}</Text>
        </CustomButton>

        <CustomButton
          styleBtn={[styles.wrap, styles.lastChild]}
          onPress={() => navigation.navigate('MapScreen', { ...location, title })}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={[styles.commentCounter, { textDecorationLine: 'underline' }]}>
            {`${region}, ${country}`}
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom: 34,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  imgWrap: { width: '100%' },
  img: {
    width: '100%',
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  info: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    gap: 24,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    gap: 6,
  },
  lastChild: {
    maxWidth: '60%',
    marginLeft: 'auto',
  },
  commentCounter: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
});
