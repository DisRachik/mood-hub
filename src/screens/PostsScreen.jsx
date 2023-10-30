import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import UserFoto from '../../assets/images.jpg';
import { Card } from '../components/Card';
import { useCollection } from '../navigation/CollectionContext';
import { useAuth } from '../redux/auth/useAuth';

export const PostsScreen = () => {
  const { user } = useAuth();
  const { avatar, email, name, userId } = user;
  const ownUserFoto = { uri: avatar };

  const { collection } = useCollection();

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.userWrap}>
          <Image source={avatar ? ownUserFoto : UserFoto} style={styles.img} />
          <View style={styles.textWrap}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      )}
      style={styles.cardsWrap}
      data={collection}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Card data={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  userWrap: {
    paddingBottom: 32,
    paddingHorizontal: 16,
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
    paddingVertical: 32,
    marginBottom: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
});
