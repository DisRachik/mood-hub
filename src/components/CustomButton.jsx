import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const CustomButton = ({
  iconName,
  onPress,
  styleBtn,
  title,
  titleStyle,
  iconSize,
  iconStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, styleBtn]}>
      {title && <Text style={[styles.btnText, titleStyle]}>{title}</Text>}
      {iconName && (
        <AntDesign name={iconName} size={iconSize || 24} style={[styles.icon, iconStyle]} />
      )}
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
  icon: {
    color: '#BDBDBD',
  },
});
