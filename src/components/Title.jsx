import { StyleSheet, Text } from 'react-native';

export const Title = ({ text }) => <Text style={styles.text}>{text}</Text>;

const styles = StyleSheet.create({
	text: {
		marginTop: 32,
		fontFamily: 'Roboto',
		fontSize: 30,
		color: '#212121',
		letterSpacing: 0.3,
	},
});
