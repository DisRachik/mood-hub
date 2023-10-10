import { StyleSheet } from 'react-native';

import { CustomButton } from './CustomButton';
import { Entypo } from '@expo/vector-icons';

export const LogOutButton = ({ onPress }) => (
  <CustomButton styleBtn={{ alignSelf: 'flex-end' }} onPress={onPress}>
    <Entypo name="log-out" size={24} style={styles.icon} />
  </CustomButton>
);

const styles = StyleSheet.create({
  icon: {
    color: '#BDBDBD',
  },
});
