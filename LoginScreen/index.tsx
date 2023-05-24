/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignupScreen from './SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Input, Button } from '@rneui/themed';

const Stack = createNativeStackNavigator();

const LoginScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhoneScreen"
        component={PhoneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: true, title: 'Verification' }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: true, title: 'Signup' }}
      />
    </Stack.Navigator>
  );
};

const PhoneScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
        <Text style={styles.heading}>enter your{'\n'}contact number</Text>
        <Text style={styles.subHeading}>
          You will recieve a four digit code to very next
        </Text>
      </View>
      <Input placeholder="Contact Number" />
      <Button
        title="Continue"
        onPress={() =>
          navigation.navigate('LoginScreen', {
            screen: 'OTPScreen',
            name: 'Jane'
          })
        }
        buttonStyle={styles.button}
      />
    </View>
  );
};

const OTPScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.heading}>We sent you an SMS code</Text>
        <Text style={styles.subHeading}>on number: +91 9560 000 000</Text>
      </View>
      <Input placeholder="Enter One Time Password" />
      <Button
        title="Verify"
        onPress={() => navigation.navigate('SignupScreen')}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 0.8,
    marginHorizontal: 10
  },
  view: { alignItems: 'center' },
  heading: {
    fontSize: 24,
    textAlign: 'center'
  },
  subHeading: { marginBottom: 20 },
  button: { marginHorizontal: 10 },
  text: { fontSize: 42 },
  logo: { width: 150, height: 47, marginBottom: 40 }
});

export default LoginScreen;
