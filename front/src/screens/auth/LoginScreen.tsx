import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InputField from '../../components/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

interface LoginScreenProps {

}

function LoginScreen({}: LoginScreenProps) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })

  const handleChangeValues = (name:string, text: string) => {
    setValues({
      ...values, 
      [name]: text
    })
  }

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name] : true,
    })
  }

  const handleSubmit = () => {
    console.log('values', values);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainter}>
        <InputField 
          placeholder='이메일' 
          error={'이메일을 입력하세요'} 
          touched={touched.email}
          inputMode='email'
          value={values.email}
          onChangeText={(text) => handleChangeValues('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField 
          placeholder='비밀번호'
          error={'비밀번호를 입력하세요'}
          touched={touched.password} 
          secureTextEntry
          value={values.password}
          onChangeText={(text) => handleChangeValues('password', text)}  
          onBlur={() => handleBlur('password')}
        />
      </View>
      <CustomButton 
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainter: {
    gap: 20,
  }
});

export default LoginScreen;