import { StyleSheet } from 'react-native';

export const baseFormStyles = StyleSheet.create({
	formWrap: {
		width: '100%',
		marginTop: 33,
		paddingRight: 16,
		paddingLeft: 16,
		gap: 16,
	},
	input: {
		width: '100%',
		height: 50,
		padding: 15,
		backgroundColor: '#f6f6f6',
		borderWidth: 0.5,
		borderColor: '#E8E8E8',
		borderStyle: 'solid',
		borderRadius: 8,

		color: '#212121',
		fontSize: 16,
		fontWeight: '400',
	},
	inputActive: {
		backgroundColor: '#FFFFFF',
		borderColor: '#FF6C00',
		color: '#212121',
	},
	error: {
		position: 'absolute',
		left: 16,
		bottom: -13,
		color: 'red',
		fontSize: 12,
	},
});
