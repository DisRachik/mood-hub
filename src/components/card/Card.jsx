import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export const Card = ({ data }) => {
  const { img, title, comment, region, country } = data;

  const [comments, setComments] = useState(comment.length);

  return (
    <>
      <Image source={img} style={styles.img} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.info}>
        <View style={styles.wrap}>
          <Feather name="message-circle" size={24} color={comments ? '#FF6C00' : '#BDBDBD'} />
          <Text style={styles.infoText}>{comment.length}</Text>
        </View>
        <View style={styles.wrap}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text
            style={[styles.infoText, { textDecorationLine: 'underline' }]}
          >{`${region}, ${country}`}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
    gap: 6,
  },
  commentCounter: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
});
