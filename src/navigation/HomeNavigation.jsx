import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const HomeStack = createBottomTabNavigator();

import {
  PostsScreen,
  CommentsScreen,
  ProfileScreen,
  MapScreen,
  CreatePostsScreen,
} from '../screens';
import { LogOutButton } from '../components';
import { headerOptions } from './headerOptions';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const HomeNavigation = () => {
  const navigation = useNavigation();
  const [lastScreen, setLastScreen] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const { name } = navigation.getCurrentRoute();
      if (name !== 'CreatePostsScreen') {
        setLastScreen(name);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const onLogOut = () => alert('Shortly');

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
              onPress={() => {
                navigation.navigate(lastScreen);
              }}
            />
          ),
        }}
      />
      {/* <HomeStack.Screen
      name="CommentsScreen"
      component={CommentsScreen}
      options={{
        title: 'Коментарі',
      }}
    /> */}
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
      {/* <HomeStack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} /> */}
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
