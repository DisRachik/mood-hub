import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export const AuthScreenButton = ({ text, nameNavigationScreen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.informText}>
        {text}
        <Text style={styles.link}>{nameNavigationScreen}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { marginTop: 16 },

  informText: {
    fontWeight: 400,
    color: '#1B4371',
  },

  link: {
    textDecorationLine: 'underline',
  },
});
