import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { baseFormStyles } from './Form.styled';
import { useState } from 'react';
import { CustomButton } from '../CustomButton';

export const RegistrationForm = () => {
	const [activeInput, setActiveInput] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handlePassword = () => setShowPassword(!showPassword);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = data => {
		console.log(data);
	};

	return (
		<View style={baseFormStyles.formWrap}>
			<View>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							onBlur={() => {
								setActiveInput(null);
								onBlur();
							}}
							onFocus={() => {
								setActiveInput('login');
							}}
							onChangeText={onChange}
							value={value}
							placeholder='Логін'
							placeholderTextColor='#BDBDBD'
							style={[
								baseFormStyles.input,
								activeInput === 'login' && baseFormStyles.inputActive,
							]}
						/>
					)}
					name='login'
					rules={{
						required: "Це поле є обов'язковим",
					}}
					defaultValue=''
				/>
				{errors.login && (
					<Text style={baseFormStyles.error}>{errors.login.message}</Text>
				)}
			</View>

			<View>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							onBlur={() => {
								setActiveInput(null);
								onBlur();
							}}
							onFocus={() => {
								setActiveInput('email');
							}}
							onChangeText={onChange}
							value={value}
							placeholder='Адреса електронної пошти'
							placeholderTextColor='#BDBDBD'
							autoCapitalize='none'
							style={[
								baseFormStyles.input,
								activeInput === 'email' && baseFormStyles.inputActive,
							]}
						/>
					)}
					name='email'
					rules={{
						required: "Це поле є обов'язковим",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Неправильний формат електронної пошти',
						},
					}}
					defaultValue=''
				/>
				{errors.email && (
					<Text style={baseFormStyles.error}>{errors.email.message}</Text>
				)}
			</View>

			<View>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							onBlur={() => {
								setActiveInput(null);
								onBlur();
							}}
							onFocus={() => {
								setActiveInput('password');
							}}
							onChangeText={value => onChange(value)}
							value={value}
							placeholder='Пароль'
							placeholderTextColor='#BDBDBD'
							secureTextEntry={!showPassword}
							style={[
								baseFormStyles.input,
								activeInput === 'password' && baseFormStyles.inputActive,
							]}
						/>
					)}
					name='password'
					rules={{ required: "Це поле є обов'язковим" }}
					defaultValue=''
				/>
				{errors.password && (
					<Text style={baseFormStyles.error}>{errors.password.message}</Text>
				)}

				<CustomButton
					title={!showPassword ? 'Показати' : 'Приховати'}
					onPress={handlePassword}
					styleBtn={styles.passwordBtn}
					titleStyle={styles.textBtn}
				/>
			</View>

			<CustomButton
				title='Зареєстуватися'
				onPress={handleSubmit(onSubmit)}
				styleBtn={styles.formBtn}
				titleStyle={styles.formBtnText}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	passwordBtn: {
		height: '100%',
		position: 'absolute',
		right: 16,
	},
	textBtn: {
		color: '#1B4371',
	},
	formBtn: {
		width: '100%',
		height: 51,
		backgroundColor: '#FF6C00',
		borderRadius: 100,
	},
	formBtnText: {
		color: '#fff',
	},
});
