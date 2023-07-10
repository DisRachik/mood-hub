import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const CustomButton = ({
	iconName,
	onPress,
	iconBtn,
	title,
	iconSize,
	iconStyle,
}) => {
	console.log(iconStyle);

	return (
		<TouchableOpacity onPress={onPress} style={iconBtn}>
			{title && <Text>{title}</Text>}
			{iconName && (
				<AntDesign
					name={iconName}
					size={iconSize || 24}
					style={[styles.icon, iconStyle]}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	icon: {
		color: '#BDBDBD',
	},
});
