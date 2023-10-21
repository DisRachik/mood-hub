import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CustomButton = ({ onPress, styleBtn, title, titleStyle, children, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, styleBtn]}
      activeOpacity={0.8}
      disabled={disabled}
    >
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
    fontFamily: 'Roboto-Regular',
  },
});
