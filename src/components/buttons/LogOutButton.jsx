import { StyleSheet } from 'react-native';

import { CustomButton } from './CustomButton';
import { Entypo } from '@expo/vector-icons';

export const LogOutButton = () => (
  <CustomButton styleBtn={{ alignSelf: 'flex-end' }}>
    <Entypo name="log-out" size={24} style={styles.icon} />
  </CustomButton>
);

const styles = StyleSheet.create({
  icon: {
    color: '#BDBDBD',
  },
});
