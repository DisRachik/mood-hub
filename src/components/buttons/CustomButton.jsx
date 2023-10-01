import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CustomButton = ({ onPress, styleBtn, title, titleStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, styleBtn]}>
      {title && <Text style={[styles.btnText, titleStyle]}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
