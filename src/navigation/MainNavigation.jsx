import { createStackNavigator } from '@react-navigation/stack';
const MainStack = createStackNavigator();

import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { HomeNavigation } from './HomeNavigation';
import { CommentsScreen } from '../screens/CommentsScreen';
import { MapScreen } from '../screens/MapScreen';

import { headerOptions } from './headerOptions';
import { useNavigation } from '@react-navigation/native';

export const MainNavigation = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator screenOptions={headerOptions} initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
      <MainStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color={'rgba(33, 33, 33, 0.8)'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <MainStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Мапа',
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color={'rgba(33, 33, 33, 0.8)'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};
