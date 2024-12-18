import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthHomeScreen from '../../screens/AuthHomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import { authNavigations } from '../../constants';
import SignupScreen from '../../screens/SignupScreen';


export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: {
        backgroundColor: 'white',
      }
    }}>
        <Stack.Screen name={authNavigations.AUTH_HOME} component={AuthHomeScreen}/>
        <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen}/>
        <Stack.Screen name={authNavigations.SIGNUP} component={SignupScreen}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;