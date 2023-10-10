import { Image, StyleSheet, Text, View } from 'react-native';
import UserFoto from '../../assets/images.jpg';
import { FlatList } from 'react-native-gesture-handler';
import { posts } from '../data/posts';
import { Card, CardFooter } from '../components';

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Image source={UserFoto} style={styles.img} />
        <View style={styles.textWrap}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        style={styles.cardsWrap}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card data={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  userWrap: {
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
    marginTop: 32,
  },
  separator: {
    height: 34,
  },
});
