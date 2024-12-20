import React from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.AUTH_HOME>;

function AuthHomeScreen({navigation} : AuthHomeScreenProps) {
  return (
    <SafeAreaView>
        <View>
          <CustomButton 
            label="로그인하기" 
            onPress={() => navigation.navigate('Login')}/>
          <CustomButton 
            label="회원가입하기" 
            variant="outlined" 
            onPress={() => navigation.navigate('Signup')}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;