import { createStackNavigator } from '@react-navigation/stack';
const AuthStack = createStackNavigator();

import { LoginScreen, RegistrationScreen } from '../screens';

export const AuthNavigation = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);
