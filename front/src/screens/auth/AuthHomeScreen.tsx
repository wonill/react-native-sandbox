import React from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

function AuthHomeScreen({navigation} : AuthHomeScreenProps) {
  return (
    <SafeAreaView>
        <View>
          <Button title="로그인 화면으로 이동" onPress={() => navigation.navigate('Login')}/>
          <Button title="회원가입 화면으로 이동" onPress={() => navigation.navigate('Signup')}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;