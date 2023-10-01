import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const HomeStack = createBottomTabNavigator();

import {
  PostsScreen,
  CommentsScreen,
  ProfileScreen,
  MapScreen,
  CreatePostsScreen,
} from '../screens';

import { headerOptions } from './headerOptions';
import { LogOutButton } from '../components';

export const HomeNavigation = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="PostsScreen"
      component={PostsScreen}
      options={{
        ...headerOptions,
        title: 'Публікації',
        headerRight: () => <LogOutButton />,
      }}
    />
    <HomeStack.Screen
      name="CreatePostsScreen"
      component={CreatePostsScreen}
      options={{
        ...headerOptions,
        title: 'Створити публікацію',
      }}
    />
    {/* <HomeStack.Screen
      name="CommentsScreen"
      component={CommentsScreen}
      options={{
        ...headerOptions,
        title: 'Коментарі',
      }}
    /> */}
    <HomeStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    {/* <HomeStack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} /> */}
  </HomeStack.Navigator>
);
