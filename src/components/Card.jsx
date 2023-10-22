import { useState } from 'react';
import { StyleSheet, Image, Text, View, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthScreenButton } from './buttons/AuthScreenButton';
import { CustomButton } from './buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';

export const Card = ({ data, likeCount }) => {
  const { img, title, comment, region, country, rating, location } = data;

  const [comments] = useState(comment.length);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const imgHeight = width * 0.7;

  const createAddressText = () => (likeCount ? `${country}` : `${region}, ${country}`);

  return (
    <View style={styles.container}>
      <Image source={img} style={[styles.img, { height: imgHeight }]} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <CustomButton styleBtn={styles.wrap} onPress={() => navigation.navigate('CommentsScreen')}>
          <Feather name="message-circle" size={24} color={comments ? '#FF6C00' : '#BDBDBD'} />
          <Text style={styles.infoText}>{comment.length}</Text>
        </CustomButton>
        {likeCount && (
          <View style={styles.wrap}>
            <Feather name="thumbs-up" size={24} color={rating ? '#FF6C00' : '#BDBDBD'} />
            <Text style={styles.infoText}>{rating}</Text>
          </View>
        )}
        <CustomButton
          styleBtn={[styles.wrap, { marginLeft: 'auto' }]}
          onPress={() => navigation.navigate('MapScreen', { ...location, title })}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={[styles.infoText, { textDecorationLine: 'underline' }]}>
            {likeCount ? `${country}` : `${region}, ${country}`}
          </Text>
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 34,
    paddingHorizontal: 16,
  },
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
    marginTop: 8,
    flexDirection: 'row',
    gap: 24,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commentCounter: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
});
