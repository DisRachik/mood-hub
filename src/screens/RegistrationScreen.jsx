import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Title, CustomButton, RegistrationForm } from '../components';
import { useState } from 'react';

export const RegistrationScreen = () => {
	const [userPhoto, setUserPhoto] = useState(null);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.imgWrap}>
				<CustomButton
					iconName='pluscircleo'
					onPress={() => {}}
					iconSize={25}
					iconBtn={styles.iconBtn}
					iconStyle={userPhoto ?? styles.iconActive}
				/>
			</View>
			<Title text='Реєстрація' />
			<RegistrationForm />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.66,
		alignItems: 'center',
		paddingTop: 60,
		backgroundColor: '#fff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	imgWrap: {
		width: 120,
		height: 120,
		position: 'absolute',
		top: -60,

		backgroundColor: '#f6f6f6',
		borderRadius: 16,
	},
	iconBtn: {
		right: '-100%',
		top: '100%',
		transform: [{ translateY: -37.5 }, { translateX: -12.5 }],
	},
	iconActive: {
		color: '#FF6C00',
	},
});
