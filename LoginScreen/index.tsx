/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import SignupScreen from './SignupScreen';
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CheckBox, Dialog, Image, Input, Button } from '@rneui/themed';
import { Loading } from '../app/components'


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
  const [confirm, setConfirm] = useState(null);

  // // verification code (OTP - One-Time-Passcode)
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [visible, setVisible] = useState(false);

  const [code, setCode] = useState('');
  const [loader, setLoader] = useState<boolean>(false);

  // // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // navigation.navigate('Home');
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    setLoader(true)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setLoader(false)
    setConfirm(confirmation);
  }

  async function confirmCode() {
    setLoader(true);

    try {
      await confirm.confirm(code);
    } catch (error) {
      Alert.alert('Invalid code', 'Please enter a valid code received on your mobile', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

    setLoader(false);
  }

  if (!confirm) {
    return (<>
      <View style={styles.container}>
        <View style={styles.view}>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.heading}>enter your{'\n'}contact number</Text>
          <Text style={styles.subHeading}>
            You will recieve a four digit code to very next
          </Text>
        </View>
        <View style={styles.phoneInputContainer}>
          <Input
            placeholder="Contry Code"
            containerStyle={styles.countryCode}
            inputContainerStyle={{ borderRightWidth: 0 }}
            value={countryCode}
            disabled
            onChangeText={text => setCountryCode(text)}
          />
          <Input
            placeholder="Contact Number"
            containerStyle={styles.col}
            keyboardType='numeric'
            value={phone} 
            onChangeText={text => setPhone(text)}
          />
        </View>
        <Button title="Continue" onPress={() => signInWithPhoneNumber(`${countryCode}${phone}`)} />
        <Button
          title="Change Country"
          type="outline"
          raised
          containerStyle={{marginTop: 20}}
          onPress={() => setVisible(true)}
        />
      </View>
      <Dialog
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      <Dialog.Title title="Select Country"/>
      {[{
          country: 'India',
          code: "+91"
        }, {
          country: 'United Kingdom',
          code: '+44'
        }].map(({country, code}, i) => (
        <CheckBox
          key={i}
          title={country}
          containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={countryCode === code}
          onPress={() => setCountryCode(code)}
        />
      ))}

      <Dialog.Actions>
        <Dialog.Button
          title="CONFIRM"
          onPress={() => {
            console.log(`Option ${countryCode} was selected!`);
            setVisible(false);
          }}
        />
        <Dialog.Button title="CANCEL" onPress={() => setVisible(false)} />
      </Dialog.Actions>
    </Dialog>
      <Loading loading={loader} />
    </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.heading}>We sent you an SMS code</Text>
          <Text style={styles.subHeading}>on number: {countryCode} {phone}</Text>
        </View>
        <Input keyboardType='numeric' placeholder="Enter One Time Password" value={code} onChangeText={text => setCode(text)} />
        <Button title="Verify" onPress={() => confirmCode()} />
      </View>
      <Loading loading={loader} />
    </>
  );
}

const OTPScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.heading}>We sent you an SMS code</Text>
        <Text style={styles.subHeading}>on number: +91 9560 000 000</Text>
      </View>
      <Input placeholder="Enter One Time Password" />
      <Button title="Verify" onPress={() => navigation.navigate('SignupScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'row',
  },
  countryCode: { flex: 0.17, borderRightWidth: 0 },
  col: { flex: 1 },
  container: {
    justifyContent: 'center',
    flex: 0.8,
    marginHorizontal: 20
  },
  activityIndicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  view: { alignItems: 'center' },
  heading: {
    fontSize: 24,
    textAlign: 'center'
  },
  subHeading: { marginBottom: 20 },
  text: { fontSize: 42 },
  logo: { width: 150, height: 47, marginBottom: 40 }
});

export default LoginScreen;
