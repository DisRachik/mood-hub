import { useState } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const Card = ({ data, likeCount }) => {
  const { img, title, comment, region, country, rating } = data;

  const [comments, setComments] = useState(comment.length);

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.img} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.wrap}>
          <Feather name="message-circle" size={24} color={comments ? '#FF6C00' : '#BDBDBD'} />
          <Text style={styles.infoText}>{comment.length}</Text>
        </View>
        {likeCount && (
          <View style={styles.wrap}>
            <Feather name="thumbs-up" size={24} color={rating ? '#FF6C00' : '#BDBDBD'} />
            <Text style={styles.infoText}>{rating}</Text>
          </View>
        )}
        <View style={[styles.wrap, { marginLeft: 'auto' }]}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={[styles.infoText, { textDecorationLine: 'underline' }]}>
            {likeCount ? `${country}` : `${region}, ${country}`}
          </Text>
        </View>
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
    height: 240,
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
