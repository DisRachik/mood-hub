import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../buttons/CustomButton';
import { useAuth } from '../../navigation/AuthProvider';

export const LoginForm = ({ keyboardOpen }) => {
  const { onAccess } = useAuth();
  const [activeInput, setActiveInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => setShowPassword(!showPassword);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();

    onAccess();
  };

  return (
    <View style={styles.formWrap}>
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
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
              autoCapitalize="none"
              style={[styles.input, activeInput === 'email' && styles.inputActive]}
            />
          )}
          name="email"
          rules={{
            required: "Це поле є обов'язковим",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неправильний формат електронної пошти',
            },
          }}
          defaultValue=""
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
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
              autoCapitalize="none"
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={!showPassword}
              style={[styles.input, activeInput === 'password' && styles.inputActive]}
            />
          )}
          name="password"
          rules={{ required: "Це поле є обов'язковим" }}
          defaultValue=""
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <CustomButton
          title={!showPassword ? 'Показати' : 'Приховати'}
          onPress={handlePassword}
          styleBtn={styles.passwordBtn}
          titleStyle={styles.textBtn}
        />
      </View>

      {keyboardOpen && (
        <CustomButton
          title="Увійти"
          onPress={handleSubmit(onSubmit)}
          styleBtn={styles.formBtn}
          titleStyle={styles.formBtnText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formWrap: {
    width: '100%',
    marginTop: 33,
    paddingHorizontal: 16,
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
  passwordBtn: {
    height: '100%',
    position: 'absolute',
    right: 16,
  },
  textBtn: {
    color: '#1B4371',
  },
  formBtn: {
    marginTop: 27,
    width: '100%',
    height: 51,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },
  formBtnText: {
    color: '#fff',
  },
});
