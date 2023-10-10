import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import UserFoto from '../../assets/images.jpg';
import { posts } from '../data/posts';
import { Card } from '../components';

export const PostsScreen = () => {
  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.userWrap}>
          <Image source={UserFoto} style={styles.img} />
          <View style={styles.textWrap}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
      )}
      style={styles.cardsWrap}
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Card data={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  userWrap: {
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textWrap: {
    flexDirection: 'column',
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: 'rgba(33, 33, 33, 0.80)',
  },
  cardsWrap: {
    paddingTop: 32,
    paddingBottom: 32,
    marginBottom: 1,
    width: '100%',
  },
  // separator: {
  //   height: 34,
  // },
});
