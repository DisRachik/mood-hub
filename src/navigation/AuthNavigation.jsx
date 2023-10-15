import { createStackNavigator } from '@react-navigation/stack';
const AuthStack = createStackNavigator();
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { LoginScreen } from '../screens/LoginScreen';

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
