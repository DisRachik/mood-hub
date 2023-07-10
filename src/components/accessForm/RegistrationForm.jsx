import { useForm, Controller } from 'react-hook-form';
import { Button, View } from 'react-native';

export const RegistrationForm = () => {
	const { handleSubmit, control, errors } = useForm();

	const onSubmit = data => {
		console.log(data);
	};

	return <View></View>;
};
