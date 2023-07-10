import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const image = require('./assets/photo-bg.png');
import { RegistrationScreen } from './src/screens';

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto: require('./assets/fonts/Roboto-Medium.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ImageBackground source={image} resizeMode='cover' style={styles.imageBg}>
			<RegistrationScreen />
			<StatusBar style='auto' />
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	imageBg: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
