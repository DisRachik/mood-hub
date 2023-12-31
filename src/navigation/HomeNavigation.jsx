import { useNavigation } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const HomeStack = createBottomTabNavigator();

import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { PostsScreen } from '../screens/PostsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreatePostsScreen } from '../screens/CreatePostsScreen';

import { LogOutButton } from '../components/buttons/LogOutButton';
import { headerOptions } from './headerOptions';
import { useAuth } from '../redux/auth/useAuth';

export const HomeNavigation = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const onLogOut = () => {
    signOut();
  };

  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: 'Публікації',
          headerRight: () => <LogOutButton onPress={onLogOut} />,

          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.wrap, focused && styles.wrapFocus]}>
              <Feather name="grid" size={25} color={color} />
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name={'CreatePostsScreen'}
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.wrap, focused && styles.wrapFocus]}>
              <Feather name="plus" size={25} color={color} />
            </View>
          ),
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color={'rgba(33, 33, 33, 0.8)'}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.wrap, focused && styles.wrapFocus]}>
              <Feather name="user" size={25} color={color} />
            </View>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapFocus: {
    backgroundColor: '#FF6C00',
  },
  arrowBack: {},
});
